import { DeleteIcon } from '@/app/components/icons/DeleteIcon';
import { removeTaskIsDone } from '@/store/taskReducer';
import { useDispatch } from 'react-redux';

interface IMemuDropdown {
  id: string;
  onClose: () => void;
}

const MenuDropdownDone = ({ id, onClose }: IMemuDropdown) => {
  const dispatch = useDispatch();

  function removeHandler() {
    dispatch(removeTaskIsDone(id));
    onClose();
  }
  return (
    <div
      className='py-1.5 absolute top-12 bg-white z-10 border border-greyC4 dark:bg-gray-600 dark:border-gray-800'
      style={{ left: '78.5%' }}
    >
      <span className='block absolute -top-1.5 left-2/4 w-2.5 h-2.5 border-greyC4 border-t border-r -rotate-45 bg-white dark:bg-gray-600 dark:border-gray-800'></span>
      <div>
        <button
          className='text-grey99 flex items-center w-full px-3.5 py-2 hover:bg-greyF4 dark:hover:bg-gray-500'
          onClick={removeHandler}
        >
          <DeleteIcon />
          <span className='pl-2 dark:text-gray-300'>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default MenuDropdownDone;
