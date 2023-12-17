import { CloseBtnIcon } from '@/app/components/icons/CloseBtnIcon';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

interface IModalWindow {
  rightBtnFunc: () => void;
  leftBtnFunc: () => void;
  onClose: () => void;
  rightBtnTxt: string;
  leftBtnText: string;
  message: string;
  notifMessage?: string;
  notifIsAlowed?: boolean;
}

const ModalWindow = (props: IModalWindow) => {
  const {
    rightBtnFunc,
    leftBtnFunc,
    onClose,
    rightBtnTxt,
    leftBtnText,
    message,
    notifMessage,
    notifIsAlowed,
  } = props;
  const container = document.querySelector('#modal-root');
  const contentRef = useRef(null);

  useOutsideClick(contentRef, onClose);

  if (!container) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0 bg-modalBg z-10 flex justify-center items-center animate-fade'>
      <div
        className='bg-white p-3 w-3/12 flex justify-center items-center flex-col rounded-md animate-fade dark:bg-gray-900'
        ref={contentRef}
      >
        <button className='self-end p-1' onClick={onClose}>
          <CloseBtnIcon />
        </button>
        <p className='text-2xl mb-6 dark:text-gray-400'>{message}</p>
        {notifIsAlowed && notifMessage && (
          <p className='text-base leading-4 mb-6 dark:text-gray-400'>{notifMessage}</p>
        )}
        <div className='flex gap-5'>
          <button
            className='w-2/4 p-2 text-white leading-4 bg-redDC mb-2.5 rounded-md hover:bg-redB7 dark:bg-redB7 dark:hover:bg-redDC'
            onClick={rightBtnFunc}
          >
            {rightBtnTxt}
          </button>
          <button
            className='w-2/4 p-2 text-white leading-4 bg-green mb-2.5 rounded-md hover:bg-darkGreen dark:bg-darkGreen dark:hover:bg-green'
            onClick={leftBtnFunc}
          >
            {leftBtnText}
          </button>
        </div>
      </div>
    </div>,
    container
  );
};

export default ModalWindow;
