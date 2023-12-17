import { ReplaceIcon } from '@/app/components/icons/ReplaceIcon';
import { selectEditTask, updateEditTask, updateInputTextEdited } from '@/store/taskReducer';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InputEdit = ({ id }: { id: string }) => {
  const currentTask = useSelector(selectEditTask);
  const dispatch = useDispatch();
  const inputEditRef = useRef<HTMLInputElement | null>(null);

  function onChangeInputValueHandler() {
    if (inputEditRef.current) {
      dispatch(updateEditTask(inputEditRef.current.value));
    }
  }

  function clickHandler() {
    if (inputEditRef.current) {
      dispatch(updateInputTextEdited({ id: id, text: inputEditRef.current.value }));
    }
  }

  return (
    <div className='absolute top-32 right-2 flex gap-x-3 bg-white dark:bg-transparent'>
      <label>
        <input
          className='bg-greyF4 py-3.5 pl-5 w-48 rounded-md outline outline-1 outline-green focus:outline-green dark:bg-gray-800'
          type='text'
          value={currentTask}
          ref={inputEditRef}
          onChange={onChangeInputValueHandler}
        />
      </label>
      <button
        className='px-1 rounded-full transition-colors bg-green hover:bg-darkGreen dark:bg-darkGreen dark:hover:bg-green'
        onClick={clickHandler}
      >
        <ReplaceIcon />
      </button>
    </div>
  );
};

export default InputEdit;
