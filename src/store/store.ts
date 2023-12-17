import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskReducer';
import timerReducer from './timerReducer';
import statisticsReducer from './statisticsReducer';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    timer: timerReducer,
    statistics: statisticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
