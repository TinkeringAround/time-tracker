import { createMonthStyles } from "./month.style.js";
import {
  getDaysInMonth,
  isToday,
  months,
  toDateString,
  separateDate,
} from "../../lib/date.js";
import { Store } from "../../lib/store/store.js";

export class Month extends HTMLElement {
  static tag = "time-tracker-month";
  shadowRoot;
  headingElement;

  static create(month, year) {
    const monthElement = document.createElement(Month.tag);
    monthElement.month = month;
    monthElement.year = year;
    return monthElement;
  }

  set month(month) {
    this.setAttribute("month", month);
  }

  get month() {
    return parseInt(this.getAttribute("month"));
  }

  set year(year) {
    this.setAttribute("year", year);
  }

  get year() {
    return parseInt(this.getAttribute("year"));
  }

  constructor() {
    super();

    this.headingElement = document.createElement("h1");
    this.shadowRoot = this.attachShadow({ mode: "closed" });
    this.shadowRoot.append(createMonthStyles(), this.headingElement);

    this.addEventListener("click", () => {
      Store.setMonth(this.month);
      Store.setMode("month");
    });
  }

  connectedCallback() {
    const daysInMonth = getDaysInMonth(this.month, this.year);

    for (let i = 1; i <= daysInMonth; i++) {
      const data = Store.data[toDateString(i, this.month, this.year)];
      const divElement = document.createElement("div");
      divElement.innerText = `${i}`;

      const { dayOfWeek } = separateDate(i, this.month, this.year);
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const holiday = Store.holidays[toDateString(i, this.month, this.year)];

      if (isWeekend || holiday) {
        divElement.setAttribute("is-weekend", "");
        divElement.setAttribute("work-place", "holiday");
      }

      if (isToday(i, this.month, this.year)) {
        divElement.setAttribute("is-today", "");
      }

      if (data) {
        divElement.setAttribute("work-place", data.workPlace);
      }

      this.shadowRoot.append(divElement);
    }
    this.headingElement.textContent = months[this.month];
  }
}
