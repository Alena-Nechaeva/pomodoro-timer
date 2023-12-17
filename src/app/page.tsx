import DescriptionBlock from '@/app/components/timerComponents/DescriptionBlock/DescriptionBlock';
import TimerBlock from './components/timerComponents/TimerBlock/TimerBlock';

export default function Home() {
  return (
    <main>
      <div className='container flex justify-between items-start flex-wrap mx-auto my-0 pt-12'>
        <DescriptionBlock />
        <TimerBlock />
      </div>
    </main>
  );
}
