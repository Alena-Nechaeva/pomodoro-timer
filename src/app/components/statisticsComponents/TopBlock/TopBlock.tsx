import {
  setInUseCurDay,
  setPauseMSCurDay,
  setStopsCurDay,
  setTomatoesCurDay,
  setWeek,
  setWorkMinCurDay,
} from '@/store/statisticsReducer';
import { selectIsDark } from '@/store/timerReducer';
import { Select, Option } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';

const TopBlock = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);

  return (
    <div className='mb-8 flex justify-between'>
      <h2 className='font-bold text-2xl text-gray-800 dark:text-darkGreen'>Your activity</h2>
      <div className='w-72'>
        <Select
          variant='outlined'
          label='Select week'
          onChange={(val) => {
            if (val) dispatch(setWeek(val));
            dispatch(setWorkMinCurDay(0));
            dispatch(setStopsCurDay(0));
            dispatch(setPauseMSCurDay(0));
            dispatch(setTomatoesCurDay(0));
            dispatch(setInUseCurDay(0));
          }}
          className='dark:bg-gray-800 dark:text-darkGreen'
          color={isDark ? 'blue-gray' : 'gray'}
          menuProps={{ className: 'dark:bg-gray-800' }}
        >
          <Option className='dark:text-darkGreen' value='cur'>
            Current week
          </Option>
          <Option className='dark:text-darkGreen' value='prev'>
            Previous week
          </Option>
          <Option className='dark:text-darkGreen' value='prev-prev'>
            2 weeks ago
          </Option>
        </Select>
      </div>
    </div>
  );
};

export default TopBlock;
