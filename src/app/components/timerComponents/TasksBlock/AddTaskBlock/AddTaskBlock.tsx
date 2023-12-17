'use client';

import { addTask, selectInputIsShining, selectInputText, updateInputText } from '@/store/taskReducer';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateRandomString } from '@/utils/generateRandomString';
import { useSelector } from 'react-redux';
import { EnterIcon } from '@/app/components/icons/EnterIcon';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const AddTaskBlock = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputValue = useSelector(selectInputText);
  const isInputShining = useSelector(selectInputIsShining);
  const [isValid, setIsValid] = useState(false);

  function clickHandler() {
    if (inputRef.current) {
      if (inputRef.current.value.length < 3) {
        setIsValid(true);
        inputRef.current.style.outline = '2px solid #DC3E22';
      } else {
        dispatch(addTask({ id: generateRandomString(), text: inputRef.current.value, tomatoCount: 1 }));
        dispatch(updateInputText(''));
        setIsValid(false);
        inputRef.current.style.outline = 'none';
      }
    }
  }

  function keyEnterHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') clickHandler();
  }

  function onChangeInputValue() {
    if (inputRef.current) {
      dispatch(updateInputText(inputRef.current.value));
      inputRef.current.style.outline = 'none';
    }
  }

  useOutsideClick(inputRef, () => setIsValid(false));

  return (
    <div className='flex items-center w-full my-6 relative'>
      <label
        className={
          isInputShining
            ? 'mr-auto rounded-md shadow-lg shadow-darkGreen transition-shadow'
            : 'mr-auto rounded-md'
        }
      >
        <input
          ref={inputRef}
          className='bg-greyF4 py-3.5 pl-5 w-96 rounded-md focus:outline-green dark:bg-gray-800'
          type='text'
          placeholder='write new task here'
          onKeyDown={keyEnterHandler}
          value={inputValue}
          onChange={onChangeInputValue}
        />
      </label>
      {isValid && (
        <span className='absolute -bottom-5 text-redDC text-base'>Task must contain more than 3 letters</span>
      )}
      <button
        className='text-base leading-4 py-4 px-3.5 rounded-full ml-auto transition-colors bg-green hover:bg-darkGreen text-white dark:bg-darkGreen dark:hover:bg-green'
        onClick={clickHandler}
        type='submit'
      >
        <EnterIcon />
      </button>
    </div>
  );
};

export default AddTaskBlock;
