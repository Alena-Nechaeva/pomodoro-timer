'use client';

import { IItemObject, selectDataTasks, selectDataTasksDone, sortTasksByDnD } from '@/store/taskReducer';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem/TaskItem';
import Separator from '../../Separator/Separator';
import TaskItemDone from './TaskItemDone/TaskItemDone';
import { resetTimerCount, selectWorkMin } from '@/store/timerReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const TasksList = () => {
  const tasks = useSelector(selectDataTasks);
  const tasksDoneList = useSelector(selectDataTasksDone);
  const settingsWorkMin = useSelector(selectWorkMin);
  const dispatch = useDispatch();

  function totalTime() {
    const tomatoesTotal = tasks.reduce((accum, item) => {
      accum += item.tomatoCount;
      return accum;
    }, 0);

    const minutes = (tomatoesTotal * settingsWorkMin) % 60;
    const hour = (tomatoesTotal * settingsWorkMin - minutes) / 60;

    const hourStr = hour > 1 ? `${hour} hours` : `${hour} hour`;
    const minutesStr = minutes > 0 ? `${minutes} min` : ``;

    return hour > 0 ? `${hourStr} ${minutesStr}` : `${minutesStr}`;
  }

  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);

  function handleSort() {
    const tasksClone = [...tasks];
    const temp = tasksClone[dragItem.current];
    tasksClone[dragItem.current] = tasksClone[draggedOverItem.current];
    tasksClone[draggedOverItem.current] = temp;
    dispatch(sortTasksByDnD(tasksClone));
    dispatch(resetTimerCount());
  }

  return (
    <div className='pb-6 2xl:pb-44'>
      {tasksDoneList.length > 0 && (
        <ul>
          <Separator />
          {tasksDoneList.map((task: IItemObject) => {
            return (
              <TaskItemDone key={task.id} text={task.text} id={task.id} tomatoCount={task.tomatoCount} />
            );
          })}
        </ul>
      )}
      {tasks.length > 0 && (
        <ul>
          {tasksDoneList.length === 0 && <Separator />}
          {tasks.map((task: IItemObject, index: number) => {
            return (
              <TaskItem
                key={task.id}
                text={task.text}
                id={task.id}
                tomatoCount={task.tomatoCount}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (draggedOverItem.current = index)}
                handleSort={handleSort}
              />
            );
          })}
        </ul>
      )}
      <div className='pt-5 text-grey99'>{tasks.length > 0 && totalTime()}</div>
    </div>
  );
};

export default TasksList;
