import {
  selectBreakMin,
  selectLongBreakInterval,
  selectLongBreakMin,
  selectWorkMin,
  updateBreakMin,
  updateLongBreakInterval,
  updateLongBreakMin,
  updateWorkMin,
} from '@/store/timerReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ReactSlider from 'react-slider';

const Settings = () => {
  const workMin = useSelector(selectWorkMin);
  const breakMin = useSelector(selectBreakMin);
  const longBreakMin = useSelector(selectLongBreakMin);
  const longBreakInterval = useSelector(selectLongBreakInterval);
  const dispatch = useDispatch();

  return (
    <div className='w-80 flex flex-col items-center justify-evenly'>
      <div className='w-full'>
        <label className='text-redDC'>Work-mode minutes {workMin}:00</label>
        <ReactSlider
          className='h-11 border-2 border-redDC rounded-lg'
          thumbClassName='bg-redDC w-10 h-10 rounded-full'
          trackClassName={'track'}
          value={workMin}
          onChange={(newValue) => dispatch(updateWorkMin(newValue))}
          min={1}
          max={60}
        />
      </div>
      <div className='w-full'>
        <label className='text-green'>Break-mode minutes {breakMin}:00</label>
        <ReactSlider
          className='h-11 border-2 border-green rounded-lg'
          thumbClassName='bg-green w-10 h-10 rounded-full'
          trackClassName={'track'}
          value={breakMin}
          onChange={(newValue) => dispatch(updateBreakMin(newValue))}
          min={1}
          max={60}
        />
      </div>
      <div className='w-full'>
        <label className='text-darkGreen'>Long-break-mode minutes {longBreakMin}:00</label>
        <ReactSlider
          className='h-11 border-2 border-darkGreen rounded-lg'
          thumbClassName='bg-darkGreen w-10 h-10 rounded-full'
          trackClassName={'track'}
          value={longBreakMin}
          onChange={(newValue) => dispatch(updateLongBreakMin(newValue))}
          // min={15}
          min={2}
          max={30}
        />
      </div>
      <div className='w-full'>
        <label className='text-darkGreen'>Set long break every {longBreakInterval} tomatoes</label>
        <ReactSlider
          className='h-11 border-2 border-darkGreen rounded-lg'
          thumbClassName='bg-darkGreen w-10 h-10 rounded-full'
          trackClassName={'track'}
          value={longBreakInterval}
          onChange={(newValue) => dispatch(updateLongBreakInterval(newValue))}
          min={2}
          max={8}
        />
      </div>
    </div>
  );
};

export default Settings;
