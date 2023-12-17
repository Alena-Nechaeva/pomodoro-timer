import { PauseIcon } from '@/app/components/icons/PauseIcon';
import { setPauseClickedUTC } from '@/store/statisticsReducer';
import { updateIsPaused } from '@/store/timerReducer';
import { useDispatch } from 'react-redux';

const PauseBtn = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  return (
    <button
      disabled={!Boolean(id)}
      onClick={() => {
        dispatch(updateIsPaused(true));
        dispatch(setPauseClickedUTC(new Date().getTime()));
      }}
    >
      <PauseIcon />
    </button>
  );
};

export default PauseBtn;
