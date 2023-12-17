import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IInitialState {
  tomatoesCounter: number;
  workingMinuetsSum: number;
  stopsCounter: number;
  pauseClickedUTC: number;
  msOnPauseSum: number;
  inUseCounter: number;
  week: string;
  workMinCurDay: number;
  stopsCurDay: number;
  pauseMSCurDay: number;
  tomatoesCurDay: number;
  inUseCurDay: number;
}

const initialState: IInitialState = {
  tomatoesCounter: 0,
  workingMinuetsSum: 0,
  stopsCounter: 0,
  pauseClickedUTC: 0,
  msOnPauseSum: 0,
  inUseCounter: 0,
  week: 'cur',
  workMinCurDay: 0,
  stopsCurDay: 0,
  pauseMSCurDay: 0,
  tomatoesCurDay: 0,
  inUseCurDay: 0,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    increaseTomatoesCount: (state) => {
      state.tomatoesCounter++;
    },
    increaseStopsCount: (state) => {
      state.stopsCounter++;
    },
    updateWorkingMinuetsSum: (state, data: PayloadAction<number>) => {
      state.workingMinuetsSum = state.workingMinuetsSum + data.payload;
    },
    setPauseClickedUTC: (state, data: PayloadAction<number>) => {
      state.pauseClickedUTC = data.payload;
    },
    getSecondsOnPause: (state, data: PayloadAction<number>) => {
      const playClickedUTC = data.payload;
      const secondsOnPauseDiff = playClickedUTC - state.pauseClickedUTC;
      state.msOnPauseSum = state.msOnPauseSum + secondsOnPauseDiff;
    },
    setWeek: (state, data: PayloadAction<string>) => {
      state.week = data.payload;
    },
    setWorkMinCurDay: (state, data: PayloadAction<number>) => {
      state.workMinCurDay = data.payload;
    },
    setStopsCurDay: (state, data: PayloadAction<number>) => {
      state.stopsCurDay = data.payload;
    },
    setPauseMSCurDay: (state, data: PayloadAction<number>) => {
      state.pauseMSCurDay = data.payload;
    },
    setTomatoesCurDay: (state, data: PayloadAction<number>) => {
      state.tomatoesCurDay = data.payload;
    },
    setInUseCurDay: (state, data: PayloadAction<number>) => {
      state.inUseCurDay = data.payload;
    },
    updateInUseCounter: (state) => {
      state.inUseCounter++;
    },
  },
});

export const {
  increaseTomatoesCount,
  increaseStopsCount,
  updateWorkingMinuetsSum,
  setPauseClickedUTC,
  getSecondsOnPause,
  setWeek,
  setWorkMinCurDay,
  setStopsCurDay,
  setPauseMSCurDay,
  setTomatoesCurDay,
  setInUseCurDay,
  updateInUseCounter,
} = statisticsSlice.actions;
export const selectTomatoesCounter = (state: RootState) => state.statistics.tomatoesCounter;
export const selectWorkingMinuetsSum = (state: RootState) => state.statistics.workingMinuetsSum;
export const selectStopsCounter = (state: RootState) => state.statistics.stopsCounter;
export const selectMsOnPauseSum = (state: RootState) => state.statistics.msOnPauseSum;
export const selectWeek = (state: RootState) => state.statistics.week;
export const selectWorkMinCurDay = (state: RootState) => state.statistics.workMinCurDay;
export const selectStopsCurDay = (state: RootState) => state.statistics.stopsCurDay;
export const selectPauseMSCurDay = (state: RootState) => state.statistics.pauseMSCurDay;
export const selectTomatoesCurDay = (state: RootState) => state.statistics.tomatoesCurDay;
export const selectInUseCurDay = (state: RootState) => state.statistics.inUseCurDay;
export const selectInUseCounter = (state: RootState) => state.statistics.inUseCounter;

export default statisticsSlice.reducer;
