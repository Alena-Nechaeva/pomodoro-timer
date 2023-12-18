import React, { useEffect } from 'react';
import Time from './Time/Time';
import { increaseTomatoes, selectDataTasks, taskIsDone } from '@/store/taskReducer';
import Settings from './Settings/Settings';
import { useSelector } from 'react-redux';
import {
  selectBreakMin,
  selectIsPaused,
  selectIsStopped,
  selectMode,
  selectSecondsLeftWork,
  selectSecondsLeftBreak,
  selectShowSettings,
  selectWorkMin,
  updateBreakMin,
  updateIsPaused,
  updateIsStopped,
  updateMode,
  tickSecondsLeft,
  updateWorkMin,
  increaseTimerCount,
  selectShowDoneModal,
  resetTimerCount,
  setShowDoneModalFalse,
  setEqualTimerCountWithTomCount,
  modeType,
  selectCounterForLongBreak,
  increaseCounterForLongBreak,
  selectSecondsLeftLongBreak,
  selectLongBreakMin,
  updateLongBreakMin,
  resetCounterForLongBreak,
  selectLongBreakInterval,
  selectNotification,
  selectIsDark,
} from '@/store/timerReducer';
import Controls from './Controls/Controls';
import { useDispatch } from 'react-redux';
import ModalWindow from '../../ModalWindow/ModalWindow';
import { increaseTomatoesCount, updateWorkingMinuetsSum } from '@/store/statisticsReducer';

const Timer = ({ id }: { id: string }) => {
  const settingsWorkMin = useSelector(selectWorkMin),
    settingsBreakMin = useSelector(selectBreakMin),
    settingsLongBreakMin = useSelector(selectLongBreakMin),
    settingsLongBreakInterval = useSelector(selectLongBreakInterval);

  const isStopped = useSelector(selectIsStopped),
    showSettings = useSelector(selectShowSettings),
    mode = useSelector(selectMode),
    isPaused = useSelector(selectIsPaused),
    isDark = useSelector(selectIsDark);

  const secondsLeftWork = useSelector(selectSecondsLeftWork),
    secondsLeftBreak = useSelector(selectSecondsLeftBreak),
    secondsLeftLongBreak = useSelector(selectSecondsLeftLongBreak),
    counterForLongBreak = useSelector(selectCounterForLongBreak);

  const showDoneModal = useSelector(selectShowDoneModal);
  const notificationPermission = useSelector(selectNotification);
  const tasks = useSelector(selectDataTasks);
  const firstTask = tasks[0];
  const currentTomatoesNumber = firstTask?.tomatoCount;
  const tasksLength = tasks.length;

  const dispatch = useDispatch();

  useEffect(() => {
    function switchMode() {
      let chooseMode: modeType;

      if (mode === 'work') {
        if (counterForLongBreak % settingsLongBreakInterval === 0) {
          chooseMode = 'longBreak';
          dispatch(updateMode(chooseMode));
        } else {
          chooseMode = 'break';
          dispatch(updateMode(chooseMode));
        }
      } else if (mode === 'break' || mode === 'longBreak') {
        chooseMode = 'work';
        dispatch(updateMode(chooseMode));
        if (mode === 'longBreak') dispatch(resetCounterForLongBreak());
      }
    }

    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        if (secondsLeftWork === 0 || secondsLeftBreak === 0 || secondsLeftLongBreak === 0) {
          dispatch(updateIsPaused(true));
          dispatch(updateIsStopped(true));
          dispatch(increaseTimerCount(currentTomatoesNumber));
          dispatch(increaseCounterForLongBreak(currentTomatoesNumber));
          if (secondsLeftWork === 0) {
            dispatch(increaseTomatoesCount());
            dispatch(updateWorkingMinuetsSum(settingsWorkMin));
          }

          if (notificationPermission === 'granted') {
            const notif = new Notification('Time`s up!', {
              body: 'Please check your pomodoro timer',
              icon: 'https://img.icons8.com/?size=512&id=5gCSMarcUt2p&format=png',
            });
          }
          return switchMode();
        } else if (mode === 'work') dispatch(tickSecondsLeft('work'));
        else if (mode === 'break') dispatch(tickSecondsLeft('break'));
        else if (mode === 'longBreak') dispatch(tickSecondsLeft('longBreak'));
      }, 1000);
    } else {
      if (secondsLeftWork === 0 || secondsLeftBreak === 0 || secondsLeftLongBreak === 0) {
        dispatch(updateWorkMin(settingsWorkMin));
        dispatch(updateBreakMin(settingsBreakMin));
        dispatch(updateLongBreakMin(settingsLongBreakMin));
      } else return;
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    settingsWorkMin,
    settingsBreakMin,
    firstTask?.id,
    dispatch,
    isPaused,
    secondsLeftWork,
    secondsLeftBreak,
    mode,
    currentTomatoesNumber,
    counterForLongBreak,
    settingsLongBreakMin,
    secondsLeftLongBreak,
    settingsLongBreakInterval,
    notificationPermission,
  ]);

  async function doneHandler() {
    dispatch(taskIsDone(id));
    dispatch(updateIsStopped(true));
    dispatch(updateIsPaused(true));
    dispatch(updateMode('work'));
    dispatch(updateWorkMin(settingsWorkMin));
    dispatch(resetTimerCount());
    dispatch(setShowDoneModalFalse());
  }

  function addTomatoHandler() {
    dispatch(increaseTomatoes(id));
    dispatch(setShowDoneModalFalse());
    dispatch(setEqualTimerCountWithTomCount(currentTomatoesNumber));
  }

  return (
    <div className='p-8 bg-white flex justify-around h-96 dark:bg-transparent'>
      {showSettings ? (
        <Settings />
      ) : (
        <Time
          mode={mode}
          secondsLeftWork={secondsLeftWork}
          secondsLeftBreak={secondsLeftBreak}
          secondsLeftLongBreak={secondsLeftLongBreak}
          settingsWorkMin={settingsWorkMin}
          settingsBreakMin={settingsBreakMin}
          settingsLongBreakMin={settingsLongBreakMin}
          isDark={isDark}
        />
      )}
      <Controls
        id={id}
        isPaused={isPaused}
        isStopped={isStopped}
        showSettings={showSettings}
        tasksLength={tasksLength}
        mode={mode}
        currentTomatoesNumber={currentTomatoesNumber}
      />
      {showDoneModal && (
        <ModalWindow
          rightBtnFunc={addTomatoHandler}
          leftBtnFunc={doneHandler}
          onClose={() => dispatch(setShowDoneModalFalse())}
          rightBtnTxt='Add one more pomodoro'
          leftBtnText='Done'
          message={`${firstTask.text} - is done?`}
          notifMessage='Please allow the browser to send desktop notifications to notify you when the time of the current `Pomodoro` is over'
          notifIsAlowed={notificationPermission === 'granted' ? false : true}
        />
      )}
    </div>
  );
};

export default Timer;
