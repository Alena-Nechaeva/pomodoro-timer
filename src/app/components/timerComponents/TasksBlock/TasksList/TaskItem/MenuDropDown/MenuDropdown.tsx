import { DeleteIcon } from '@/app/components/icons/DeleteIcon';
import { EditIcon } from '@/app/components/icons/EditIcon';
import { IncrementIcon } from '@/app/components/icons/IncrementIcon';
import { IncrementIconDisabled } from '@/app/components/icons/IncrementIconDisabled';
import { ReduceIcon } from '@/app/components/icons/ReduceIcon';
import { showEditTask, reduceTomatoes, removeTask, selectDataTasks } from '@/store/taskReducer';
import { increaseTomatoes } from '@/store/taskReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ReduceIconDisabled } from '@/app/components/icons/ReduceIconDisabled';
import {
  resetTimerCount,
  selectWorkMin,
  updateIsPaused,
  updateIsStopped,
  updateMode,
  updateWorkMin,
} from '@/store/timerReducer';
import { useRef, useState } from 'react';
import InputEdit from './InputEdit/InputEdit';
import ModalWindow from '@/app/components/timerComponents/ModalWindow/ModalWindow';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface IMemuDropdown {
  id: string;
  onClose: () => void;
  disableReduce: boolean;
  disableIncrease: boolean;
  isStopped: boolean;
}

const MenuDropdown = ({ id, onClose, disableReduce, disableIncrease }: IMemuDropdown) => {
  const dispatch = useDispatch();
  const workMin = useSelector(selectWorkMin);
  const tasks = useSelector(selectDataTasks);
  const firstTaskId = tasks[0].id;
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const [isInputEditOpen, setIsInputEditOpen] = useState(false);
  const dropdownWrapper = useRef(null);

  function removeHandler() {
    dispatch(removeTask(id));
    onClose();
    if (id === firstTaskId) {
      dispatch(updateIsStopped(true));
      dispatch(updateIsPaused(true));
      dispatch(updateMode('work'));
      dispatch(updateWorkMin(workMin));
      dispatch(resetTimerCount());
    }
  }

  function editHandler() {
    setIsInputEditOpen(true);
    dispatch(showEditTask(id));
  }

  function increaseHandler() {
    dispatch(increaseTomatoes(id));
  }

  function reduceHandler() {
    dispatch(reduceTomatoes(id));
  }

  useOutsideClick(dropdownWrapper, onClose);

  return (
    <div
      className='py-1.5 absolute top-12 bg-white z-10 border border-greyC4 dark:bg-gray-600 dark:border-gray-800'
      style={{ left: '78.5%' }}
      ref={dropdownWrapper}
    >
      <span className='block absolute -top-1.5 left-2/4 w-2.5 h-2.5 border-greyC4 border-t border-r -rotate-45 bg-white dark:bg-gray-600 dark:border-gray-800'></span>
      <ul>
        <li>
          <button
            className='text-grey99 flex items-center w-full px-3.5 py-2 hover:bg-greyF4 dark:hover:bg-gray-500'
            onClick={increaseHandler}
            disabled={disableIncrease}
          >
            {disableIncrease ? <IncrementIconDisabled /> : <IncrementIcon />}
            <span className='pl-2 dark:text-gray-300'>Increase</span>
          </button>
        </li>
        <li>
          <button
            className='text-grey99 flex items-center w-full px-3.5 py-2 hover:bg-greyF4 dark:hover:bg-gray-500'
            onClick={reduceHandler}
            disabled={disableReduce}
          >
            {disableReduce ? <ReduceIconDisabled /> : <ReduceIcon />}
            <span className='pl-2 dark:text-gray-300'>Reduce</span>
          </button>
        </li>
        <li>
          <button
            className='text-grey99 flex items-center w-full px-3.5 py-2 hover:bg-greyF4 dark:hover:bg-gray-500'
            onClick={editHandler}
          >
            <EditIcon />
            <span className='pl-2 dark:text-gray-300'>Edit</span>
          </button>
          {isInputEditOpen && <InputEdit id={id} />}
        </li>
        <li>
          <button
            className='text-grey99 flex items-center w-full px-3.5 py-2 hover:bg-greyF4 dark:hover:bg-gray-500'
            onClick={() => setIsModalRemoveOpen(true)}
          >
            <DeleteIcon />
            <span className='pl-2 dark:text-gray-300'>Remove</span>
          </button>
        </li>
      </ul>
      {isModalRemoveOpen && (
        <ModalWindow
          rightBtnFunc={removeHandler}
          leftBtnFunc={onClose}
          onClose={onClose}
          rightBtnTxt='Remove'
          leftBtnText='I`ve changed my mind'
          message='Are you shure about it?'
        />
      )}
    </div>
  );
};

export default MenuDropdown;
