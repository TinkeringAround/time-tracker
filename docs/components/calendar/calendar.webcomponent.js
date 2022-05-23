import {
    getDaysInMonth,
    getNext,
    getPrevious,
    separateDate,
} from "../../lib/date.js";
import {createCalendarStyles, getCalendarGridStyles} from "./calendar.style.js";
import {Day} from "../day/day.webcomponent.js";
import {Store} from "../../lib/store/store.js";
import {StoreEvents} from "../../lib/store/events.js";
import {Month} from "../month/month.webcomponent.js";

export class Calendar extends HTMLElement {
    static tag = "time-tracker-calendar"
    shadowRoot;
    gridStyleSheet;

    constructor() {
        super();

        this.gridStyleSheet = document.createElement("style");
        this.shadowRoot = this.attachShadow({mode: "closed"});
        this.shadowRoot.append(createCalendarStyles(), this.gridStyleSheet);

        window.addEventListener(StoreEvents.loadChange, () => this.onChange());
        window.addEventListener(StoreEvents.modeChange, () => this.onChange());
        window.addEventListener(StoreEvents.monthChange, () => this.onChange());
        window.addEventListener(StoreEvents.yearChange, () => this.onChange());
    }

    connectedCallback() {
        this.onChange();
    }

    disconnectedCallback() {
        window.removeEventListener(StoreEvents.loadChange, () => this.onChange());
        window.removeEventListener(StoreEvents.modeChange, () => this.onChange())
        window.removeEventListener(StoreEvents.monthChange, () => this.onChange());
        window.removeEventListener(StoreEvents.yearChange, () => this.onChange());
    }

    onChange() {
        this.removeMonths();
        this.removeDays();

        if (Store.loaded) {
            if (Store.mode === "month") {
                this.renderMonthCalendar();
            } else {
                this.renderYearCalendar();
            }
        }
    }

    renderMonthCalendar() {
        const {month, year} = Store;
        const firstDayOfMonth = separateDate(1, month, year).dayOfWeek;
        const daysInMonth = getDaysInMonth(month, year);

        const previousDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const {previousMonth, previousYear} = getPrevious(month, year);
        const previousDaysOfMonth = getDaysInMonth(previousMonth, previousYear);

        const nextDays = 42 - previousDays - daysInMonth;
        const {nextMonth, nextYear} = getNext(month, year);

        for (let i = previousDays - 1; i >= 0; i--) {
            this.shadowRoot.appendChild(Day.create(previousDaysOfMonth - i, previousMonth, previousYear, true));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            this.shadowRoot.appendChild(Day.create(i, month, year, false));
        }

        for (let i = 0; i < nextDays; i++) {
            this.shadowRoot.appendChild(Day.create(i + 1, nextMonth, nextYear, true));
        }

        this.gridStyleSheet.innerHTML = getCalendarGridStyles(Store.mode);
    }

    removeDays() {
        const dayButtons = this.shadowRoot.querySelectorAll(Day.tag);
        [...dayButtons].forEach(dateButton => dateButton.remove());
    }

    renderYearCalendar() {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(month => {
            this.shadowRoot.appendChild(Month.create(month, Store.year));
        });

        this.gridStyleSheet.innerHTML = getCalendarGridStyles(Store.mode);
    }

    removeMonths() {
        const monthButtons = this.shadowRoot.querySelectorAll(Month.tag);
        [...monthButtons].forEach(monthButton => monthButton.remove());
    }
}