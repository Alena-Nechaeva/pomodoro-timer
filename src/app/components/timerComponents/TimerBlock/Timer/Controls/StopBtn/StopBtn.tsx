import { StopIcon } from '@/app/components/icons/StopIcon';
import { StopIconDisabled } from '@/app/components/icons/StopIconDisabled';
import { getSecondsOnPause, increaseStopsCount } from '@/store/statisticsReducer';
import { makeInputShine } from '@/store/taskReducer';
import {
  selectWorkMin,
  updateIsPaused,
  updateIsStopped,
  updateMode,
  updateWorkMin,
} from '@/store/timerReducer';
import { useDispatch, useSelector } from 'react-redux';

interface IPlayBtnProps {
  tasksLength: number;
  showSettings: boolean;
  firstTaskExist: boolean;
  isStopped: boolean;
  isPaused: boolean;
}

const StopBtn = ({ tasksLength, showSettings, firstTaskExist, isStopped, isPaused }: IPlayBtnProps) => {
  const dispatch = useDispatch();
  const settingsWorkMin = useSelector(selectWorkMin);

  function mouseEnterHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(true));
    else return;
  }

  function mouseLeaveHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(false));
    else return;
  }

  function stopHandler() {
    dispatch(updateIsStopped(true));
    dispatch(updateIsPaused(true));
    dispatch(updateMode('work'));
    dispatch(updateWorkMin(settingsWorkMin));
    dispatch(increaseStopsCount());
    if (isPaused && !isStopped) dispatch(getSecondsOnPause(new Date().getTime()));
  }

  return (
    <button
      disabled={firstTaskExist || showSettings || isStopped}
      onClick={stopHandler}
      onMouseOver={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
    >
      {firstTaskExist || showSettings || isStopped ? <StopIconDisabled /> : <StopIcon />}
    </button>
  );
};

export default StopBtn;
