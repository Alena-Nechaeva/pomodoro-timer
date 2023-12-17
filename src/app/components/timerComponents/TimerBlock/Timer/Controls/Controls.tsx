import { SettingsIcon } from '@/app/components/icons/SettingsIcon';
import { TimerIcon } from '@/app/components/icons/TimerIcon';
import { useDispatch } from 'react-redux';
import { updateShowSettings } from '@/store/timerReducer';
import { SettingsIconDisabled } from '@/app/components/icons/SettingsIconDisabled';
import AddTomatoBtn from './AddTomatoBtn/AddTomatoBtn';
import PlayBtn from './PlayBtn/PlayBtn';
import PauseBtn from './PauseBtn/PauseBtn';
import StopBtn from './StopBtn/StopBtn';
import SkipBtn from './SkipBtn/SkipBtn';
import DoneBtn from './DoneBtn/DoneBtn';

interface IControlsProps {
  id: string;
  showSettings: boolean;
  isPaused: boolean;
  isStopped: boolean;
  tasksLength: number;
  mode: 'work' | 'break' | 'longBreak';
  currentTomatoesNumber: number;
}

const Controls = (props: IControlsProps) => {
  const dispatch = useDispatch();
  const { id, showSettings, isPaused, isStopped, tasksLength, mode, currentTomatoesNumber } = props;
  return (
    <div className='flex flex-col items-center justify-around'>
      <AddTomatoBtn id={id} tasksLength={tasksLength} />
      <div className='flex flex-col md:flex-row'>
        {isPaused ? (
          <PlayBtn
            tasksLength={tasksLength}
            showSettings={showSettings}
            firstTaskExist={!Boolean(id)}
            isPaused={isPaused}
            isStopped={isStopped}
          />
        ) : (
          <PauseBtn id={id} />
        )}
        {mode === 'break' || mode === 'longBreak' ? (
          <SkipBtn currentTomatoesNumber={currentTomatoesNumber} showSettings={showSettings} />
        ) : (
          <StopBtn
            tasksLength={tasksLength}
            showSettings={showSettings}
            firstTaskExist={!Boolean(id)}
            isStopped={isStopped}
            isPaused={isPaused}
          />
        )}
      </div>
      <DoneBtn id={id} tasksLength={tasksLength} showSettings={showSettings} />
      {isStopped ? (
        <button onClick={() => dispatch(updateShowSettings(!showSettings))}>
          {showSettings ? <TimerIcon /> : <SettingsIcon />}
        </button>
      ) : (
        <button onClick={() => dispatch(updateShowSettings(!showSettings))} disabled={true}>
          <SettingsIconDisabled />
        </button>
      )}
    </div>
  );
};

export default Controls;
