import { DoneIcon } from '@/app/components/icons/DoneIcon';
import { DoneIconDisabled } from '@/app/components/icons/DoneIconDisabled';
import { makeInputShine, taskIsDone } from '@/store/taskReducer';
import {
  resetTimerCount,
  selectWorkMin,
  updateIsPaused,
  updateIsStopped,
  updateMode,
  updateWorkMin,
} from '@/store/timerReducer';
import { useDispatch, useSelector } from 'react-redux';

const DoneBtn = ({
  tasksLength,
  id,
  showSettings,
}: {
  tasksLength: number;
  id: string;
  showSettings: boolean;
}) => {
  const dispatch = useDispatch();
  const workMin = useSelector(selectWorkMin);

  function mouseEnterHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(true));
    else return;
  }

  function mouseLeaveHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(false));
    else return;
  }

  function doneClickHandler() {
    dispatch(taskIsDone(id));
    dispatch(updateIsStopped(true));
    dispatch(updateIsPaused(true));
    dispatch(updateMode('work'));
    dispatch(updateWorkMin(workMin));
    dispatch(resetTimerCount());
  }

  return (
    <button
      onClick={doneClickHandler}
      onMouseOver={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
      disabled={!Boolean(id) || showSettings}
    >
      {!Boolean(id) || showSettings ? <DoneIconDisabled /> : <DoneIcon />}
    </button>
  );
};

export default DoneBtn;
