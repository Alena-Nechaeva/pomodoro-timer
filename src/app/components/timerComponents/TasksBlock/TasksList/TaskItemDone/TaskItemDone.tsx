import { useRef, useState } from 'react';
import Separator from '../../../Separator/Separator';
import { MenuIcon } from '@/app/components/icons/MenuIcon';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { IItemObject } from '@/store/taskReducer';
import MenuDropdownDone from './MenuDropDownDone/MenuDropdownDone';

const TaskItem = ({ text, id, tomatoCount }: IItemObject) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const closeDropdown = () => setIsDropOpen(false);
  const dropdownWrapper = useRef(null);

  useOutsideClick(dropdownWrapper, closeDropdown);

  return (
    <>
      <li className='p-3.5 flex items-center relative'>
        <span className='rounded-full border border-greyC4 py-0.5 px-2.5 mr-2.5 text-greyC4 dark:text-gray-700 dark:border-gray-700'>
          {tomatoCount}
        </span>
        <span className='mr-auto line-through text-greyC4 dark:text-gray-700'>{text}</span>
        <button className='p-3 pr-4' onClick={() => setIsDropOpen(!isDropOpen)}>
          <MenuIcon />
        </button>
        <div ref={dropdownWrapper}>{isDropOpen && <MenuDropdownDone id={id} onClose={closeDropdown} />}</div>
      </li>
      <Separator />
    </>
  );
};

export default TaskItem;
