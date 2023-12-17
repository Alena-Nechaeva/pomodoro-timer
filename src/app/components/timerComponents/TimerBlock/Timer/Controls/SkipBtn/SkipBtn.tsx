import { SkipIcon } from '@/app/components/icons/SkipIcon';
import { SkipIconDisabled } from '@/app/components/icons/SkipIconDisabled';
import {
  increaseTimerCountWithSkip,
  selectWorkMin,
  updateIsPaused,
  updateIsStopped,
  updateMode,
  updateWorkMin,
} from '@/store/timerReducer';
import { useDispatch, useSelector } from 'react-redux';

const SkipBtn = ({
  currentTomatoesNumber,
  showSettings,
}: {
  currentTomatoesNumber: number;
  showSettings: boolean;
}) => {
  const dispatch = useDispatch();
  const settingsWorkMin = useSelector(selectWorkMin);

  function skipHandler() {
    dispatch(updateIsStopped(true));
    dispatch(updateIsPaused(true));
    dispatch(updateMode('work'));
    dispatch(updateWorkMin(settingsWorkMin));
    dispatch(increaseTimerCountWithSkip(currentTomatoesNumber));
  }

  return (
    <button onClick={skipHandler} disabled={showSettings}>
      {showSettings ? <SkipIconDisabled /> : <SkipIcon />}
    </button>
  );
};

export default SkipBtn;
