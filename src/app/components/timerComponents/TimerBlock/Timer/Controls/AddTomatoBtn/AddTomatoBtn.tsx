import { AddTomatoIcon } from '@/app/components/icons/AddTomatoIcon';
import { AddTomatoIconDisabled } from '@/app/components/icons/AddTomatoIconDisabled';
import { increaseTomatoes, makeInputShine } from '@/store/taskReducer';
import { useDispatch } from 'react-redux';

const AddTomatoBtn = ({ tasksLength, id }: { tasksLength: number; id: string }) => {
  const dispatch = useDispatch();

  function mouseEnterHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(true));
    else return;
  }

  function mouseLeaveHandler() {
    if (tasksLength === 0) dispatch(makeInputShine(false));
    else return;
  }
  return (
    <button
      onClick={() => dispatch(increaseTomatoes(id))}
      onMouseOver={mouseEnterHandler}
      onMouseOut={mouseLeaveHandler}
      disabled={!Boolean(id)}
    >
      {!Boolean(id) ? <AddTomatoIconDisabled /> : <AddTomatoIcon />}
    </button>
  );
};

export default AddTomatoBtn;
