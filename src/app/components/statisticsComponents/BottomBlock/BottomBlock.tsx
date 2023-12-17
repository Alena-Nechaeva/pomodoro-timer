import FocusIcon from '../../icons/FocusIcon';
import FocusIconDisabled from '../../icons/FocusIconDisabled';
import StopsIcon from '../../icons/StopsIcon';
import TimeOnPauseIcon from '../../icons/TimeOnPauseIcon';
import {
  selectInUseCurDay,
  selectPauseMSCurDay,
  selectStopsCurDay,
  selectWorkMinCurDay,
} from '@/store/statisticsReducer';
import { useSelector } from 'react-redux';
import TimeOnPauseIconDisabled from '../../icons/TimeOnPauseIconDisabled';
import StopsIconDisabled from '../../icons/StopsIconDisabled';

const BottomBlock = () => {
  const stopsCount = useSelector(selectStopsCurDay);
  const msOnPauseSum = useSelector(selectPauseMSCurDay);
  const workingMinuetsSum = useSelector(selectWorkMinCurDay);
  const appInUseSec = useSelector(selectInUseCurDay);

  function getTimeFromMs(ms: number) {
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const minutes = totalMinutes % 60;
    return `${minutes} min`;
  }

  function getFocus() {
    const wsToWm = Math.floor(appInUseSec / 60);
    const focus = Math.round((workingMinuetsSum / wsToWm) * 100);
    return !isNaN(focus) ? `${focus}%` : '0%';
  }

  const focusClassesOrange =
    'p-6 flex justify-between gap-x-5 bg-orange-100 w-full dark:bg-brown-700 lg:w-1/3';
  const focusClassesIndigo =
    'p-6 flex justify-between gap-x-5 bg-indigo-100 w-full dark:bg-pauseDark lg:w-1/3';
  const focusClassesCyan = 'p-6 flex justify-between gap-x-5 bg-cyan-100 w-full dark:bg-stopsDark lg:w-1/3';
  const classesGray = 'p-6 flex justify-between gap-x-5 bg-gray-200 w-full dark:bg-gray-800 lg:w-1/3';

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>
      <div className={workingMinuetsSum > 0 ? focusClassesOrange : classesGray}>
        <div className='flex flex-col'>
          <p className='font-bold text-2xl text-gray-800 dark:text-gray-500'>Focus</p>
          <p className='text-5xl my-auto text-gray-800 dark:text-gray-500'>{getFocus()}</p>
        </div>
        <div className='my-auto'>{workingMinuetsSum > 0 ? <FocusIcon /> : <FocusIconDisabled />}</div>
      </div>
      <div className={workingMinuetsSum > 0 ? focusClassesIndigo : classesGray}>
        <div className='flex flex-col'>
          <p className='font-bold text-2xl text-gray-800 dark:text-gray-500'>Time on pause</p>
          <p className='text-5xl my-auto text-gray-800 dark:text-gray-500'>{getTimeFromMs(msOnPauseSum)}</p>
        </div>
        <div className='my-auto'>
          {workingMinuetsSum > 0 ? <TimeOnPauseIcon /> : <TimeOnPauseIconDisabled />}
        </div>
      </div>
      <div className={workingMinuetsSum > 0 ? focusClassesCyan : classesGray}>
        <div className='flex flex-col'>
          <p className='font-bold text-2xl text-gray-800 dark:text-gray-500'>Stops</p>
          <p className='text-5xl my-auto text-gray-800 dark:text-gray-500'>{stopsCount}</p>
        </div>
        <div className='my-auto'>{workingMinuetsSum > 0 ? <StopsIcon /> : <StopsIconDisabled />}</div>
      </div>
    </div>
  );
};

export default BottomBlock;
