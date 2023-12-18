'use client';

import Timer from './Timer/Timer';
import { useSelector } from 'react-redux';
import { makeInputShine, selectDataTasks } from '@/store/taskReducer';
import { useDispatch } from 'react-redux';
import { selectMode, selectTimerCount } from '@/store/timerReducer';
import { useEffect, useState } from 'react';
import IndexedDb from '../../IndexedDBClass/IndexedDB';
import {
  selectInUseCounter,
  selectMsOnPauseSum,
  selectStopsCounter,
  selectTomatoesCounter,
  selectWorkingMinuetsSum,
  updateInUseCounter,
} from '@/store/statisticsReducer';

const TimerBlock = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectDataTasks);
  const timerCount = useSelector(selectTimerCount);
  const mode = useSelector(selectMode);
  const currentTask = tasks[0];

  const red = 'text-redDC dark:text-redB7';
  const green = 'text-green dark:text-darkGreen';
  const darkGreen = 'text-darkGreen';
  const [colorTheme, setColorTheme] = useState(red);
  useEffect(() => {
    if (mode === 'work') {
      setColorTheme(red);
    } else if (mode === 'break') {
      setColorTheme(green);
    } else if (mode === 'longBreak') {
      setColorTheme(darkGreen);
    }
  }, [mode]);

  //db needs
  const totalTomatoes = useSelector(selectTomatoesCounter);
  const totalWorkingMinutes = useSelector(selectWorkingMinuetsSum);
  const totalPauseTime = useSelector(selectMsOnPauseSum);
  const stopsBtnCounter = useSelector(selectStopsCounter);
  const inUseCounter = useSelector(selectInUseCounter);
  // const currentDate = new Date().toLocaleDateString(); // m/d/yyyy
  const currentDateObj = new Date();
  const day = currentDateObj.getDate().toString().padStart(2, '0');
  const month = (currentDateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDateObj.getFullYear();
  const currentDate = `${month}-${day}-${year}`;

  useEffect(() => {
    const runIndexDb = async () => {
      const indexedDb = new IndexedDb('StatisticsData');
      await indexedDb.createObjectStore(['statistics']);
      const length = (await indexedDb.getAllValue('statistics')).length;
      await indexedDb.putValue('statistics', {
        id: length + 1,
        date: currentDate,
        totalTomatoes: 0,
        totalWorkingMinutes: 0,
        totalPauseTime: 0,
        stopsBtnCounter: 0,
        appInUseSec: 0,
      });
    };
    window.addEventListener('beforeunload', runIndexDb);

    return () => {
      window.removeEventListener('beforeunload', runIndexDb);
    };
  }, [currentDate, dispatch]);

  useEffect(() => {
    const runIndexDb = async () => {
      const indexedDb = new IndexedDb('StatisticsData');
      await indexedDb.createObjectStore(['statistics']);
      const length = (await indexedDb.getAllValue('statistics')).length;
      await indexedDb.putValue('statistics', {
        id: length,
        date: currentDate,
        totalTomatoes: totalTomatoes,
        totalWorkingMinutes: totalWorkingMinutes,
        totalPauseTime: totalPauseTime,
        stopsBtnCounter: stopsBtnCounter,
        appInUseSec: inUseCounter * 10,
      });
    };
    runIndexDb();
  }, [
    currentDate,
    stopsBtnCounter,
    inUseCounter,
    totalPauseTime,
    totalTomatoes,
    totalWorkingMinutes,
    dispatch,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      dispatch(updateInUseCounter());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  function mouseEnterHandler() {
    if (tasks.length === 0) dispatch(makeInputShine(true));
    else return;
  }

  function mouseLeaveHandler() {
    if (tasks.length === 0) dispatch(makeInputShine(false));
    else return;
  }

  return (
    <div
      className='w-full flex flex-col mb-6 rounded-md shadow-lg shadow-greyC4 transition-shadow dark:bg-transparent 2xl:w-2/4 2xl:mb-0'
      style={{ minHeight: '500px' }}
    >
      <div
        className='bg-greyF4 py-5 px-10 text-white font-medium dark:bg-gray-900'
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {tasks.length > 0 ? (
          <div className='flex items-center justify-between text-xl'>
            <span className={colorTheme}>{currentTask.text}</span>
            <span className={colorTheme}>pomodoro {timerCount}</span>
          </div>
        ) : (
          <span className='cursor-default text-grey99'>Please add new task</span>
        )}
      </div>
      <Timer id={tasks.length > 0 ? currentTask?.id : ''} />
    </div>
  );
};

export default TimerBlock;
