'use client';

import { useEffect, useState } from 'react';
import TasksBlock from '../TasksBlock/TasksBlock';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import Separator from '../Separator/Separator';
import { AccIcon } from '../../icons/AccIcon';
import { useDispatch } from 'react-redux';
import { setNotificationStatus } from '@/store/timerReducer';
import { AddTomatoIcon } from '../../icons/AddTomatoIcon';
import { PlayIcon } from '../../icons/PlayIcon';
import { PauseIcon } from '../../icons/PauseIcon';
import { StopIcon } from '../../icons/StopIcon';
import { DoneIcon } from '../../icons/DoneIcon';
import Settings from '../TimerBlock/Timer/Settings/Settings';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { SkipIcon } from '../../icons/SkipIcon';

const DescriptionBlock = () => {
  const [open, setOpen] = useState<0 | 1>(1);
  const handleOpen = (value: 1 | 0) => setOpen(open === value ? 0 : value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('Browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      dispatch(setNotificationStatus('granted'));
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          dispatch(setNotificationStatus('granted'));
        } else {
          dispatch(setNotificationStatus('denied'));
        }
      });
    }
  }, [dispatch]);

  return (
    <div className='w-max mr-5'>
      <Accordion open={open === 1} icon={<AccIcon id={1} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className='border-greyE4 hover:text-green transition-colors dark:text-darkGreen dark:hover:text-green'
        >
          <h2 className='text-2xl font-bold mb-2'>Ta-daaam! Now you can start working</h2>
        </AccordionHeader>
        <AccordionBody>
          <ul className='pl-8' style={{ listStyle: 'url(/listIcon.png)' }}>
            <li className='mb-2.5 text-base dark:text-greyC4'>
              Select a category and write the name of the current task
            </li>
            <li className='mb-2.5 text-base dark:text-greyC4'>Start the timer - `tomato`</li>
            <li className='mb-2.5 text-base dark:text-greyC4'>Work until the `tomato` rings</li>
            <li className='mb-2.5 text-base dark:text-greyC4'>Take a short break (3-5 minutes)</li>
            <li className='mb-2.5 text-base dark:text-greyC4'>
              Keep working `tomato` after `tomato` until the task is completed
            </li>
            <li className='mb-2.5 text-base dark:text-greyC4'>
              Take a long break every 4 `tomatoes` (15-30 minutes)
            </li>
          </ul>
          <ul>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <AddTomatoIcon />
              <span> - Add 1 `pomodoro` for current task</span>
            </li>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <PlayIcon />/<PauseIcon />
              <span> - Play and pause buttons</span>
            </li>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <StopIcon />
              <span> - Stop current `pomodoro` - `pomodoro` will not be earned</span>
            </li>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <SkipIcon />
              <span> - Skip current break</span>
            </li>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <DoneIcon />
              <span> - Add task into the `done` list</span>
            </li>
            <li className='flex items-center gap-5 mb-2.5 text-base dark:text-greyC4'>
              <SettingsIcon />
              <span> - Setup parameters</span>
            </li>
          </ul>
          <Separator />
        </AccordionBody>
      </Accordion>
      <TasksBlock />
    </div>
  );
};

export default DescriptionBlock;
