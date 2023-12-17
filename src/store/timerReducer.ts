import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type modeType = 'work' | 'break' | 'longBreak';

interface IInitialState {
  workMin: number;
  breakMin: number;
  longBreakMin: number;
  longBreakInterval: number;
  isPaused: boolean;
  isStopped: boolean;
  showSettings: boolean;
  mode: modeType;
  secondsLeftWork: number;
  secondsLeftBreak: number;
  secondsLeftLongBreak: number;
  timerCount: number;
  showDoneModal: boolean;
  counterForLongBreak: number;
  notification?: 'granted' | 'denied';
  isDarkMode: boolean;
}

const initialState: IInitialState = {
  workMin: 25,
  breakMin: 5,
  longBreakMin: 10,
  longBreakInterval: 4,
  isPaused: true,
  isStopped: true,
  showSettings: false,
  mode: 'work',
  secondsLeftWork: 0,
  secondsLeftBreak: 0,
  secondsLeftLongBreak: 0,
  timerCount: 1,
  showDoneModal: false,
  counterForLongBreak: 1,
  notification: 'denied',
  isDarkMode: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateWorkMin: (state, data: PayloadAction<number>) => {
      state.workMin = data.payload;
      state.secondsLeftWork = data.payload * 60;
    },
    updateBreakMin: (state, data: PayloadAction<number>) => {
      state.breakMin = data.payload;
      state.secondsLeftBreak = data.payload * 60;
    },
    updateLongBreakMin: (state, data: PayloadAction<number>) => {
      state.longBreakMin = data.payload;
      state.secondsLeftLongBreak = data.payload * 60;
    },
    updateLongBreakInterval: (state, data: PayloadAction<number>) => {
      state.longBreakInterval = data.payload;
    },
    updateIsPaused: (state, data: PayloadAction<boolean>) => {
      state.isPaused = data.payload;
    },
    updateShowSettings: (state, data: PayloadAction<boolean>) => {
      state.showSettings = data.payload;
    },
    updateMode: (state, data: PayloadAction<modeType>) => {
      state.mode = data.payload;
    },
    updateIsStopped: (state, data: PayloadAction<boolean>) => {
      state.isStopped = data.payload;
    },
    tickSecondsLeft: (state, data: PayloadAction<string>) => {
      if (data.payload === 'work') state.secondsLeftWork--;
      else if (data.payload === 'break') state.secondsLeftBreak--;
      else if (data.payload === 'longBreak') state.secondsLeftLongBreak--;
    },
    increaseTimerCount: (state, data: PayloadAction<number>) => {
      if (
        (state.secondsLeftBreak === 0 && state.mode === 'break') ||
        (state.secondsLeftLongBreak === 0 && state.mode === 'longBreak')
      ) {
        if (state.timerCount < data.payload) {
          state.timerCount++;
        } else {
          state.showDoneModal = true;
        }
      }
    },
    increaseTimerCountWithSkip: (state, data: PayloadAction<number>) => {
      if (state.timerCount < data.payload) {
        state.timerCount++;
      } else {
        state.showDoneModal = true;
      }
    },
    setEqualTimerCountWithTomCount: (state, data: PayloadAction<number>) => {
      state.timerCount = data.payload + 1;
    },
    resetTimerCount: (state) => {
      state.timerCount = 1;
    },
    setShowDoneModalFalse: (state) => {
      state.showDoneModal = false;
    },
    increaseCounterForLongBreak: (state, data: PayloadAction<number>) => {
      if (state.mode === 'work') {
        state.counterForLongBreak++;
      } else if (state.secondsLeftLongBreak === 0 && state.timerCount === data.payload) {
        state.showDoneModal = true;
      }
    },
    resetCounterForLongBreak: (state) => {
      state.counterForLongBreak = 1;
    },
    setNotificationStatus: (state, data: PayloadAction<'granted' | 'denied'>) => {
      state.notification = data.payload;
    },
    updateIsDark: (state, data: PayloadAction<boolean>) => {
      state.isDarkMode = data.payload;
    },
  },
});

export const {
  updateWorkMin,
  updateBreakMin,
  updateLongBreakMin,
  updateLongBreakInterval,
  updateIsPaused,
  updateShowSettings,
  updateMode,
  updateIsStopped,
  tickSecondsLeft,
  increaseTimerCount,
  resetTimerCount,
  increaseTimerCountWithSkip,
  setShowDoneModalFalse,
  setEqualTimerCountWithTomCount,
  resetCounterForLongBreak,
  increaseCounterForLongBreak,
  setNotificationStatus,
  updateIsDark,
} = timerSlice.actions;
export const selectWorkMin = (state: RootState) => state.timer.workMin;
export const selectBreakMin = (state: RootState) => state.timer.breakMin;
export const selectLongBreakMin = (state: RootState) => state.timer.longBreakMin;
export const selectShowSettings = (state: RootState) => state.timer.showSettings;
export const selectIsPaused = (state: RootState) => state.timer.isPaused;
export const selectIsStopped = (state: RootState) => state.timer.isStopped;
export const selectMode = (state: RootState) => state.timer.mode;
export const selectSecondsLeftWork = (state: RootState) => state.timer.secondsLeftWork;
export const selectSecondsLeftBreak = (state: RootState) => state.timer.secondsLeftBreak;
export const selectSecondsLeftLongBreak = (state: RootState) => state.timer.secondsLeftLongBreak;
export const selectTimerCount = (state: RootState) => state.timer.timerCount;
export const selectShowDoneModal = (state: RootState) => state.timer.showDoneModal;
export const selectCounterForLongBreak = (state: RootState) => state.timer.counterForLongBreak;
export const selectLongBreakInterval = (state: RootState) => state.timer.longBreakInterval;
export const selectNotification = (state: RootState) => state.timer.notification;
export const selectIsDark = (state: RootState) => state.timer.isDarkMode;
export default timerSlice.reducer;
