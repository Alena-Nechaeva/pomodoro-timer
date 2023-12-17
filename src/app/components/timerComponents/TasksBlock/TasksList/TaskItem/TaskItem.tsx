import { useEffect, useRef, useState } from 'react';
import Separator from '../../../Separator/Separator';
import { MenuIcon } from '@/app/components/icons/MenuIcon';
import MenuDropdown from './MenuDropDown/MenuDropdown';
import { useSelector } from 'react-redux';
import { selectIsStopped } from '@/store/timerReducer';
import { TomatoTopIcon } from '@/app/components/icons/TomatoTopIcon';

interface ITaskItemProps {
  text: string;
  id: string;
  tomatoCount: number;
  onDragStart: () => void;
  onDragEnter: () => void;
  handleSort: () => void;
}

const TaskItem = ({ text, id, tomatoCount, onDragStart, onDragEnter, handleSort }: ITaskItemProps) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [disableReduce, setDisableReduce] = useState(false);
  const [disableIncrease, setDisableIncrease] = useState(false);
  const isStopped = useSelector(selectIsStopped);
  const closeDropdown = () => setIsDropOpen(false);

  useEffect(() => {
    if (tomatoCount === 10) setDisableIncrease(true);
    else setDisableIncrease(false);
    if (tomatoCount === 1 || tomatoCount < 1) setDisableReduce(true);
    else setDisableReduce(false);
  }, [tomatoCount, isStopped]);

  return (
    <>
      <li
        className='p-3.5 flex items-center relative first-of-type:shadow-shadowItem dark:text-greyC4 cursor-grab'
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnter}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
      >
        <span className='rounded-full border-4 border-redDC py-0.5 px-2.5 mr-2.5 text-redDC dark:border-redB7 dark:text-redB7'>
          <span className='absolute top-2 left-5'>
            <TomatoTopIcon />
          </span>
          {tomatoCount}
        </span>
        <span className='mr-auto'>{text}</span>
        <button className='p-3 pr-4' onClick={() => setIsDropOpen(!isDropOpen)}>
          <MenuIcon />
        </button>
        {isDropOpen && (
          <MenuDropdown
            id={id}
            onClose={closeDropdown}
            disableReduce={disableReduce}
            disableIncrease={disableIncrease}
            isStopped={isStopped}
          />
        )}
      </li>
      <Separator />
    </>
  );
};

export default TaskItem;
