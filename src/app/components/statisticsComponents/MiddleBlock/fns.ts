import moment from 'moment';

export function getWorkingTime(wm: number) {
  const hours = Math.floor(wm / 60);
  const minutes = wm % 60;
  const hoursString = hours > 0 ? `${hours} h` : '';
  const minutesString = minutes > 0 ? `${minutes} min` : '';

  if (hours > 0 && minutes > 0) {
    return `${hoursString} ${minutesString}`;
  } else {
    return hoursString + minutesString;
  }
}

export function getDaysOfWeek(whatWeekIs: string) {
  const wholeWeek: Array<moment.Moment> = [];

  const currentMonday = moment().startOf('week');
  const currentSunday = moment().endOf('week');
  if (whatWeekIs === 'cur') {
    let day = currentMonday.clone();
    while (day.isBefore(currentSunday) || day.isSame(currentSunday)) {
      wholeWeek.push(day.clone());
      day.add(1, 'day');
    }
  }

  const prevSunday = currentMonday.clone().subtract(1, 'day');
  const prevMonday = prevSunday.clone().startOf('week');
  if (whatWeekIs === 'prev') {
    let day = prevMonday.clone();
    while (day.isBefore(prevSunday) || day.isSame(prevSunday)) {
      wholeWeek.push(day.clone());
      day.add(1, 'day');
    }
  }
  const prevPrevSunday = prevMonday.clone().subtract(1, 'day');
  const prevPrevMonday = prevPrevSunday.clone().startOf('week');
  if (whatWeekIs === 'prev-prev') {
    let day = prevPrevMonday.clone();
    while (!day.isAfter(prevPrevSunday) || day.isSame(prevSunday)) {
      wholeWeek.push(day.clone());
      day.add(1, 'day');
    }
  }
  return wholeWeek;
}
