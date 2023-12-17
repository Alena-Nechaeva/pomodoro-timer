import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface IItemObject {
  id: string;
  text: string;
  tomatoCount: number;
}

export interface IEditItem {
  id: string;
  text: string;
}

interface IInitialState {
  dataTasks: Array<IItemObject>;
  dataTasksDone: Array<IItemObject>;
  inputText: string;
  editTask: string;
  inputIsShining: boolean;
}

const initialState: IInitialState = {
  dataTasks: [],
  dataTasksDone: [],
  inputText: '',
  editTask: '',
  inputIsShining: false,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateInputText: (state, data: PayloadAction<string>) => {
      state.inputText = data.payload;
    },
    addTask: (state, data: PayloadAction<IItemObject>) => {
      state.dataTasks = state.dataTasks.concat(...[data.payload]);
    },
    sortTasksByDnD: (state, data: PayloadAction<Array<IItemObject>>) => {
      state.dataTasks = data.payload;
    },
    removeTask: (state, data: PayloadAction<string>) => {
      state.dataTasks = state.dataTasks.filter((item) => item.id !== data.payload);
    },
    showEditTask: (state, data: PayloadAction<string>) => {
      let targetTask = state.dataTasks.find((item) => item.id === data.payload);
      state.editTask = targetTask ? targetTask.text : '';
    },
    updateEditTask: (state, data: PayloadAction<string>) => {
      state.editTask = data.payload;
    },
    updateInputTextEdited: (state, data: PayloadAction<IEditItem>) => {
      let tasks = state.dataTasks;
      const newDataTasks = tasks.map((item) => {
        if (item.id === data.payload.id) {
          item.text = data.payload.text;
        }
        return item;
      });
      state.dataTasks = newDataTasks;
    },
    increaseTomatoes: (state, data: PayloadAction<string>) => {
      state.dataTasks.forEach((item) => {
        if (item.id === data.payload) {
          if (item.tomatoCount < 10) item.tomatoCount++;
        }
      });
    },
    reduceTomatoes: (state, data: PayloadAction<string>) => {
      state.dataTasks.forEach((item) => {
        if (item.id === data.payload) {
          item.tomatoCount--;
        }
      });
    },
    makeInputShine: (state, data: PayloadAction<boolean>) => {
      state.inputIsShining = data.payload;
    },
    taskIsDone: (state, data: PayloadAction<string>) => {
      let targetTask = state.dataTasks.find((item) => item.id === data.payload);
      state.dataTasksDone = targetTask
        ? state.dataTasksDone.concat(
            ...[{ id: targetTask.id, text: targetTask.text, tomatoCount: targetTask.tomatoCount }]
          )
        : [];
      state.dataTasks = state.dataTasks.filter((item) => item.id !== data.payload);
    },
    removeTaskIsDone: (state, data: PayloadAction<string>) => {
      state.dataTasksDone = state.dataTasksDone.filter((item) => item.id !== data.payload);
    },
  },
});

export const {
  addTask,
  removeTask,
  showEditTask,
  updateInputText,
  updateEditTask,
  updateInputTextEdited,
  increaseTomatoes,
  reduceTomatoes,
  makeInputShine,
  taskIsDone,
  removeTaskIsDone,
  sortTasksByDnD,
} = taskSlice.actions;
export const selectDataTasks = (state: RootState) => state.tasks.dataTasks;
export const selectDataTasksDone = (state: RootState) => state.tasks.dataTasksDone;
export const selectInputText = (state: RootState) => state.tasks.inputText;
export const selectEditTask = (state: RootState) => state.tasks.editTask;
export const selectInputIsShining = (state: RootState) => state.tasks.inputIsShining;

export default taskSlice.reducer;
