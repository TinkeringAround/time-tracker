import { toDateString, transformDate } from "./date.js";

export const getHolidays = (year) => {
  const eastern = getEastern(year);
  const karfreitag = addDays(new Date(eastern), -2);
  const ostermontag = addDays(new Date(eastern), 1);
  const christiHimmelfahrt = addDays(new Date(eastern), 39);
  const pfingstsonntag = addDays(new Date(eastern), 49);
  const pfingstmontag = addDays(new Date(eastern), 50);

  return {
    [toDateString(1, 0, year)]: "Neujahr",

    // Ostern
    [transformDate(karfreitag)]: "Karfreitag",
    [transformDate(eastern)]: "Ostersonntag",
    [transformDate(ostermontag)]: "Ostermontag",

    // Himmelfahrt & Pfingsten
    [transformDate(christiHimmelfahrt)]: "Himmelfahrt",
    [transformDate(pfingstsonntag)]: "Pfingstsonntag",
    [transformDate(pfingstmontag)]: "Pfingstmontag",

    // Sonstiges
    [toDateString(1, 4, year)]: "Tag der Arbeit",
    [toDateString(3, 9, year)]: "Tag der deutschen Einheit",
    [toDateString(31, 9, year)]: "Reformationstag",

    // Weihnachten
    [toDateString(24, 11, year)]: "Heiligabend",
    [toDateString(25, 11, year)]: "1. Weihnachtstag",
    [toDateString(26, 11, year)]: "2. Weihnachtstag",

    [toDateString(31, 11, year)]: "Sylvester",
  };
};

const addDays = (date, days) => {
  const changedDate = new Date(date);
  changedDate.setDate(date.getDate() + days);
  return changedDate;
};

export const getEastern = (year) => {
  const C = Math.floor(year / 100);
  const N = year - 19 * Math.floor(year / 19);
  const K = Math.floor((C - 17) / 25);
  let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;

  I -= 30 * Math.floor(I / 30);
  I -=
    Math.floor(I / 28) *
    (1 -
      Math.floor(I / 28) *
        Math.floor(29 / (I + 1)) *
        Math.floor((21 - N) / 11));
  let J = year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4);
  J -= 7 * Math.floor(J / 7);

  const L = I - J;
  const M = 3 + Math.floor((L + 40) / 44);
  const D = L + 28 - 31 * Math.floor(M / 4);

  return new Date(`${M}.${D}.${year}`);
};
