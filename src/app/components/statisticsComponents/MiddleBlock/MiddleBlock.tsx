import {
  selectTomatoesCurDay,
  selectWeek,
  selectWorkMinCurDay,
  setInUseCurDay,
  setPauseMSCurDay,
  setStopsCurDay,
  setTomatoesCurDay,
  setWorkMinCurDay,
} from '@/store/statisticsReducer';
import BigTomatoStatisticsIcon from '../../icons/BigTomatoStatisticsIcon';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { TomatoStatisticsIcon } from '../../icons/TomatoStatististicsIcon';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import IndexedDb from '../../IndexedDBClass/IndexedDB';
import { useDispatch } from 'react-redux';
import { selectIsDark } from '@/store/timerReducer';
import { getDaysOfWeek, getWorkingTime } from './fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface IDataFromDBItem {
  id: number;
  date: string;
  totalTomatoes: number;
  totalWorkingMinutes: number;
  stopsBtnCounter: number;
  totalPauseTime: number;
  appInUseSec: number;
}

interface ISortedAndCountedData {
  totalTomatoes: number;
  totalWorkingMinutes: number;
  stopsBtnCounter: number;
  totalPauseTime: number;
  appInUseSec: number;
}

// component
const MiddleBlock = () => {
  const tomatoesCounter = useSelector(selectTomatoesCurDay);
  const workingMinuetsSum = useSelector(selectWorkMinCurDay);
  const week = useSelector(selectWeek);
  const isDark = useSelector(selectIsDark);
  const [dataDB, setDataDB] = useState<Array<IDataFromDBItem>>([]);
  const barRef = useRef(null);
  const dispatch = useDispatch();
  const [indexForShowDayOfWeek, setIndexForShowDayOfWeek] = useState(-1);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const currentData = tooltipItem.raw;
            const hours = Math.floor(currentData / 60);
            const minutes = currentData % 60;
            const hoursString = hours > 0 ? `${hours} h` : '';
            const minutesString = minutes > 0 ? `${minutes} min` : '';

            if (hours > 0 && minutes > 0) {
              return `${tooltipItem.label} - ${hoursString} ${minutesString} working on tasks`;
            } else {
              return `${tooltipItem.label} - ${hoursString} ${minutesString} working on tasks`;
            }
          },
        },
      },
    },
    scales: {
      y: {
        border: { color: isDark ? '#ECECEC' : '#C4C4C4' },
        position: 'right' as const,
        grid: {
          color: isDark ? '#ECECEC' : '#C4C4C4',
        },
        ticks: {
          stepSize: 25,
          color: isDark ? '#ECECEC' : '',
          callback: function (value: any, index: number, values: any) {
            if (index === 0) return undefined;
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            const hoursString = hours > 0 ? `${hours} h` : '';
            const minutesString = minutes > 0 ? `${minutes} min` : '';

            if (hours > 0 && minutes > 0) {
              return `${hoursString} ${minutesString}`;
            } else {
              return hoursString + minutesString;
            }
          },
        },
      },
      x: {
        backgroundColor: isDark ? '' : '#ECECEC',
        border: { color: isDark ? '#ECECEC' : '#C4C4C4' },
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#ECECEC' : '',
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: '#EA8979',
      },
    },
  };

  function getDataForChartBar(dataDB: Array<IDataFromDBItem>) {
    const weekToShow = getDaysOfWeek(week);
    const dataOfChosenWeek: Array<IDataFromDBItem> = [];

    //sort data form DB by date
    for (const item of dataDB) {
      let momentDate = moment(item.date);
      for (const moment of weekToShow) {
        if (moment.isSame(momentDate)) {
          dataOfChosenWeek.push(item);
        }
      }
    }

    // sort and count data of dataOfChosenWeek
    const sortedAndCountedData: Array<ISortedAndCountedData> = [];
    dataOfChosenWeek.forEach((item: IDataFromDBItem) => {
      const currentDate = moment(item.date);
      const dayOfWeek = currentDate.weekday();

      if (!sortedAndCountedData[dayOfWeek]) {
        sortedAndCountedData[dayOfWeek] = {
          totalTomatoes: 0,
          totalWorkingMinutes: 0,
          stopsBtnCounter: 0,
          totalPauseTime: 0,
          appInUseSec: 0,
        };
      }

      sortedAndCountedData[dayOfWeek].totalTomatoes += item.totalTomatoes;
      sortedAndCountedData[dayOfWeek].totalWorkingMinutes += item.totalWorkingMinutes;
      sortedAndCountedData[dayOfWeek].stopsBtnCounter += item.stopsBtnCounter;
      sortedAndCountedData[dayOfWeek].totalPauseTime += item.totalPauseTime;
      sortedAndCountedData[dayOfWeek].appInUseSec += item.appInUseSec;
    });

    for (let i = 0; i < 7; i++) {
      if (sortedAndCountedData[i] === undefined) {
        sortedAndCountedData[i] = {
          totalTomatoes: 0,
          totalWorkingMinutes: 0,
          stopsBtnCounter: 0,
          totalPauseTime: 0,
          appInUseSec: 0,
        };
      }
    }
    return sortedAndCountedData;
  }

  function handleBarClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (barRef.current && getElementAtEvent(barRef.current, event).length > 0) {
      const barElemIndex = getElementAtEvent(barRef.current, event)[0].index;
      setIndexForShowDayOfWeek(barElemIndex);
      const currentData = getDataForChartBar(dataDB);
      const currentDataElement = currentData[barElemIndex];
      dispatch(setWorkMinCurDay(currentDataElement.totalWorkingMinutes));
      dispatch(setStopsCurDay(currentDataElement.stopsBtnCounter));
      dispatch(setPauseMSCurDay(currentDataElement.totalPauseTime));
      dispatch(setTomatoesCurDay(currentDataElement.totalTomatoes));
      dispatch(setInUseCurDay(currentDataElement.appInUseSec));
    }
  }

  //getting data from db
  useEffect(() => {
    window.moment = moment;
    moment.updateLocale('en', { week: { dow: 1 } });

    async function getDataFromIDB() {
      const indexedDb = new IndexedDb('StatisticsData');
      await indexedDb.createObjectStore(['statistics']);
      const res = await indexedDb.getAllValue('statistics');
      setDataDB(res);

      //clear indexedDB if length more than 2000
      if (res.length > 2000) {
        res.forEach(async (item: IDataFromDBItem) => {
          await indexedDb.deleteValue('statistics', item.id);
        });
      }

      // delete all empty items
      // res.forEach(async (item: IDataFromDBItem) => {
      //   if (item.totalTomatoes === 0) {
      //     await indexedDb.deleteValue('statistics', item.id);
      //   }
      // });
    }
    getDataFromIDB();
  }, []);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const labels = getDaysOfWeek(week).map((moment) => {
    return `${daysOfWeek[moment.weekday()]} ${moment.date()}/${moment.month() + 1}`;
  });

  const numbers = getDataForChartBar(dataDB).map((elem: ISortedAndCountedData) => elem.totalWorkingMinutes);
  const data = {
    labels,
    datasets: [
      {
        label: 'Total working time per day',
        data: labels.map((item, index) => numbers[index]),
      },
    ],
  };

  return (
    <div className='flex flex-col-reverse gap-8 mb-8 lg:flex-row lg:gap-y-0'>
      <div className='w-full lg:w-3/12'>
        <div className='bg-greyF4 mb-8 h-64 p-6 dark:bg-gray-800'>
          <p className='text-lg font-bold mb-3 text-gray-800 dark:text-gray-500'>
            {indexForShowDayOfWeek >= 0 && workingMinuetsSum > 0
              ? daysOfWeek[indexForShowDayOfWeek]
              : 'Choose day'}
          </p>
          {workingMinuetsSum > 0 ? (
            <p className='text-gray-800 dark:text-gray-500'>
              <span>You were working on tasks during </span>
              <span className='text-redDC font-bold dark:text-redB7'>
                {getWorkingTime(workingMinuetsSum)}
              </span>
            </p>
          ) : (
            <p className='text-gray-800 dark:text-gray-500'>no data</p>
          )}
        </div>
        {tomatoesCounter > 0 ? (
          <div className='bg-greyF4 h-64 flex flex-col justify-center items-center dark:bg-gray-800'>
            <div className='flex items-center gap-3 my-auto mx-0'>
              <TomatoStatisticsIcon />
              <span className='text-2xl font-bold text-grey99'>x {tomatoesCounter}</span>
            </div>
            <div className='py-3 w-full mt-auto bg-redDC text-white text-center text-lg font-bold dark:bg-redB7'>
              {tomatoesCounter} tomatoes
            </div>
          </div>
        ) : (
          <div className='bg-greyF4 h-64 p-6 flex justify-center items-center dark:bg-gray-800'>
            <BigTomatoStatisticsIcon />
          </div>
        )}
      </div>
      <div className='w-full bg-greyF4 px-8 pt-10 dark:bg-gray-700'>
        <Bar options={options} data={data} onClick={handleBarClick} ref={barRef} />
      </div>
    </div>
  );
};

export default MiddleBlock;
