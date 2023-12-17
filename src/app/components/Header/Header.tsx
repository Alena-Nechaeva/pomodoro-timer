'use client';

import Link from 'next/link';
import { LogoIcon } from '../icons/LogoIcon';
import { StatisticIcon } from '../icons/StatisticIcon';
import SwitchModeIcon from '../icons/SwitchModeIcon';
import { useDispatch } from 'react-redux';
import { updateIsDark } from '@/store/timerReducer';

const Header = () => {
  const dispatch = useDispatch();

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    if (document.documentElement.classList.contains('dark')) dispatch(updateIsDark(true));
    else dispatch(updateIsDark(false));
  }

  return (
    <header className='shadow-shadowItem'>
      <div className='container flex justify-between items-center flex-wrap mx-auto my-0 py-4'>
        <Link href={'/'}>
          <LogoIcon />
        </Link>
        <div className='flex items-center'>
          <Link href={'/statistics'}>
            <StatisticIcon />
          </Link>
          <button onClick={toggleTheme} className='ml-3'>
            <SwitchModeIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
