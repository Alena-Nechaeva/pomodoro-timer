import { PlayIcon } from '@/app/components/icons/PlayIcon';
import { PlayIconDisabled } from '@/app/components/icons/PlayIconDisabled';
import { getSecondsOnPause } from '@/store/statisticsReducer';
import { makeInputShine } from '@/store/taskReducer';
import { updateIsPaused, updateIsStopped } from '@/store/timerReducer';
import { useDispatch, useSelector } from 'react-redux';

interface IPlayBtnProps {
  tasksLength: number;
  showSettings: boolean;
  firstTaskExist: boolean;
  isPaused: boolean;
  isStopped: boolean;
}

const PlayBtn = ({ tasksLength, showSettings, firstTaskExist, isPaused, isStopped }: IPlayBtnProps) => {
  const dispatch = useDispatch();

  function mouseEnterHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(true));
    else return;
  }

  function mouseLeaveHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(false));
    else return;
  }

  return (
    <button
      disabled={firstTaskExist || showSettings}
      onClick={() => {
        if (isPaused && !isStopped) dispatch(getSecondsOnPause(new Date().getTime()));
        dispatch(updateIsPaused(false));
        dispatch(updateIsStopped(false));
      }}
      onMouseOver={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
    >
      {firstTaskExist || showSettings ? <PlayIconDisabled /> : <PlayIcon />}
    </button>
  );
};

export default PlayBtn;
