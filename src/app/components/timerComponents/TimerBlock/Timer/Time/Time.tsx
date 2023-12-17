import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ITimeProps {
  secondsLeftWork: number;
  secondsLeftBreak: number;
  secondsLeftLongBreak: number;
  settingsWorkMin: number;
  settingsBreakMin: number;
  settingsLongBreakMin: number;
  mode: string;
  isDark: boolean;
}

const Time = ({
  secondsLeftWork,
  secondsLeftBreak,
  secondsLeftLongBreak,
  settingsWorkMin,
  settingsBreakMin,
  settingsLongBreakMin,
  mode,
  isDark,
}: ITimeProps) => {
  const [mnts, setMnts] = useState('');
  const [scnds, setScnds] = useState('');
  const [currentSecondsLeft, setCurrentSecondsLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const red = isDark ? '#A12C17' : '#DC3E22';
  const green = '#A8B64F';
  const darkGreen = '#899441';
  const [colorTheme, setColorTheme] = useState(red);

  useEffect(() => {
    if (mode === 'work') {
      setCurrentSecondsLeft(secondsLeftWork);
      setTotalSeconds(settingsWorkMin * 60);
      setColorTheme(red);
    } else if (mode === 'break') {
      setCurrentSecondsLeft(secondsLeftBreak);
      setTotalSeconds(settingsBreakMin * 60);
      setColorTheme(green);
    } else if (mode === 'longBreak') {
      setCurrentSecondsLeft(secondsLeftLongBreak);
      setTotalSeconds(settingsLongBreakMin * 60);
      setColorTheme(darkGreen);
    }
  }, [
    secondsLeftWork,
    secondsLeftBreak,
    secondsLeftLongBreak,
    settingsBreakMin,
    settingsWorkMin,
    settingsLongBreakMin,
    mode,
    red,
  ]);

  let percentage = Math.round((currentSecondsLeft / totalSeconds) * 100);
  let minutes = Math.floor(currentSecondsLeft / 60);
  let seconds = Math.floor(currentSecondsLeft % 60);

  useEffect(() => {
    if (minutes < 10) setMnts(`0${minutes}`);
    else setMnts(`${minutes}`);

    if (seconds < 10) setScnds(`0${seconds}`);
    else setScnds(`${seconds}`);
  }, [minutes, seconds]);

  return (
    <div className='w-80 pointer-events-none'>
      <CircularProgressbar
        value={percentage}
        text={`${mnts}:${scnds}`}
        styles={buildStyles({
          textColor: colorTheme,
          pathColor: colorTheme,
          trailColor: 'transparent',
        })}
      />
    </div>
  );
};

export default Time;
