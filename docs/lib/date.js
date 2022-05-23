export const getDaysInMonth = (month, year) =>
  new Date(year, month + 1, 0).getDate();

export const separateDate = (day, month, year) => {
  let date = new Date();
  if (day > 0 && month >= 0 && year >= 0) {
    date = new Date(`${month + 1}.${day}.${year}`);
  }

  return {
    dayOfWeek: date.getDay(),
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
    day: date.getUTCDate(),
  };
};

export const isToday = (day, month, year) => {
  const today = separateDate();
  return today.day === day && today.month === month && today.year === year;
};

export const toDateString = (day, month, year) => {
  return new Date(`${month + 1}.${day}.${year}`).toLocaleDateString();
};

export const transformDate = (date) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return toDateString(day + 1, month, year);
};

export const getPrevious = (month, year) => ({
  previousMonth: month === 0 ? 11 : month - 1,
  previousYear: month === 0 ? year - 1 : year,
});

export const getNext = (month, year) => ({
  nextMonth: month === 11 ? 0 : month + 1,
  nextYear: month === 11 ? year + 1 : year,
});

export const calcWorkTime = (start, pause, end) => {
  const workTime = end.split(":").map((segment) => parseInt(segment));
  [start, pause]
    .map((time) => time.split(":").map((segment) => parseInt(segment)))
    .forEach((time) => {
      time.forEach((segment, i) => {
        workTime[i] -= segment;
      });
    });

  if (workTime[1] < 0) {
    workTime[0]--;
    workTime[1] += 60;
  }

  return workTime;
};

export const days_short = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
