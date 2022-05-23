import { separateDate, toDateString } from "../date.js";
import {
  StoreLoadChangeEvent,
  StoreDayDataChangeEvent,
  StoreModeChangeEvent,
  StoreMonthChangeEvent,
  StoreYearChangeEvent,
} from "./events.js";
import { getHolidays } from "../holiday.js";

export class Store {
  static loaded = false;
  static mode = "month";
  static today = separateDate();
  static month = Store.today.month;
  static year = Store.today.year;
  static data = {};
  static holidays = getHolidays(Store.year);

  static load = () => {
    Store.mode = localStorage.getItem("mode") ?? "month";
    const stringifiedData = localStorage.getItem("data");
    if (stringifiedData) {
      Store.setAllData(JSON.parse(stringifiedData));
    }
  };

  static setAllData = (data) => {
    if (data) {
      Store.data = data;
      localStorage.setItem("data", JSON.stringify(data));
      Store.loaded = true;
      window.dispatchEvent(new StoreLoadChangeEvent());
    } else {
      Store.data = {};
      Store.loaded = false;
      localStorage.removeItem("data");
      window.dispatchEvent(new StoreLoadChangeEvent());
    }
  };

  static setMode = (mode) => {
    if (Store.loaded && Store.mode !== mode) {
      localStorage.setItem("mode", mode);
      Store.mode = mode;
      window.dispatchEvent(new StoreModeChangeEvent());
    }
  };

  static setMonth = (month) => {
    if (Store.loaded && month !== Store.month) {
      Store.month = month;
      window.dispatchEvent(new StoreMonthChangeEvent());
    }
  };

  static setYear = (year) => {
    if (Store.loaded && Store.year !== year) {
      Store.year = year;
      window.dispatchEvent(new StoreYearChangeEvent());
    }
  };

  static setDateData = (day, month, year, start, pause, end, workPlace) => {
    const date = toDateString(day, month, year);
    let storedData = { workPlace };
    if (workPlace !== "Urlaub" && workPlace !== "Krankheit") {
      storedData = { start, pause, end, workPlace };
    }
    Store.data[date] = storedData;
    localStorage.setItem("data", JSON.stringify(Store.data));
    window.dispatchEvent(
      new StoreDayDataChangeEvent(
        day,
        month,
        year,
        start,
        end,
        pause,
        workPlace
      )
    );
  };
}

// Initialize Store
Store.load();
