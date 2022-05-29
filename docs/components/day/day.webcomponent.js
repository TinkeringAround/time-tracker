import {createDateButtonStyles} from "./day.style.js";
import {
    calcTimeCreditsForDay,
    days_short,
    isToday,
    separateDate,
    toDateString,
} from "../../lib/date.js";
import {DialogOpenEvent} from "../dialog/events.js";
import {StoreEvents} from "../../lib/store/events.js";
import {Store} from "../../lib/store/store.js";
import {createIconElement} from "../icon-button/icons.js";

export class Day extends HTMLElement {
    static tag = "time-tracker-day";
    headerElement;
    dayOfWeekElement;
    tagElement;

    static create(day, month, year, disabled) {
        const dateButtonElement = document.createElement(Day.tag);
        dateButtonElement.setAttribute("day", day);
        dateButtonElement.setAttribute("month", month);
        dateButtonElement.setAttribute("year", year);

        if (disabled) {
            dateButtonElement.setAttribute("disabled", "");
        }

        if (isToday(day, month, year)) {
            dateButtonElement.setAttribute("is-today", "");
        }

        return dateButtonElement;
    }

    getDay() {
        return parseInt(this.getAttribute("day"));
    }

    getMonth() {
        return parseInt(this.getAttribute("month"));
    }

    getYear() {
        return parseInt(this.getAttribute("year"));
    }

    getStart() {
        return this.getAttribute("start");
    }

    getPause() {
        return this.getAttribute("pause");
    }

    getEnd() {
        return this.getAttribute("end");
    }

    getWorkPlace() {
        return this.getAttribute("work-place");
    }

    getDisabled() {
        return this.getAttribute("disabled") === "";
    }

    constructor() {
        super();

        this.headerElement = document.createElement("h1");
        this.dayOfWeekElement = document.createElement("span");
        this.dayOfWeekElement.setAttribute("day-of-week", "");
        this.tagElement = document.createElement("span");
        this.tagElement.setAttribute("work-time", "");

        this.attachShadow({mode: "closed"}).append(
            createDateButtonStyles(),
            this.headerElement,
            this.dayOfWeekElement,
            this.tagElement
        );

        this.addEventListener("click", () => {
            if (!this.getDisabled()) {
                window.dispatchEvent(
                    new DialogOpenEvent(
                        this.getDay(),
                        this.getMonth(),
                        this.getYear(),
                        this.getStart(),
                        this.getEnd(),
                        this.getPause(),
                        this.getWorkPlace()
                    )
                );
            }
        });

        window.addEventListener(StoreEvents.dayDataChange, (event) =>
            this.onDayDataChange(event.detail)
        );
    }

    connectedCallback() {
        const date = toDateString(this.getDay(), this.getMonth(), this.getYear());
        const data = Store.data[date];

        if (data) {
            if (data.workPlace !== "Urlaub" && data.workPlace !== "Krank") {
                this.setAttribute("start", data.start);
                this.setAttribute("pause", data.pause);
                this.setAttribute("end", data.end);
            }
            this.setAttribute("work-place", data.workPlace);
        }

        this.render();
    }

    disconnectedCallback() {
        window.removeEventListener(StoreEvents.dayDataChange, (event) =>
            this.onDayDataChange(event.detail)
        );
    }

    render() {
        const {dayOfWeek} = separateDate(
            this.getDay(),
            this.getMonth(),
            this.getYear()
        );
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const holiday =
            Store.holidays[
                toDateString(this.getDay(), this.getMonth(), this.getYear())
                ];

        this.headerElement.textContent = this.getDay();
        this.dayOfWeekElement.textContent = days_short[dayOfWeek];

        if (isWeekend || holiday) {
            this.setAttribute("disabled", "");

            if (holiday) {
                this.setAttribute("work-place", "holiday");
                this.tagElement.textContent = holiday;
            } else {
                this.tagElement.style.opacity = "0";
            }

            return;
        }

        const wp = this.getWorkPlace();
        if (wp === "Gleitzeit" || wp === "Krank" || wp === "Urlaub") {
            this.tagElement.textContent = this.getWorkPlace();
            this.tagElement.style.opacity = "1";
            return;
        }

        if (this.getStart() && this.getPause() && this.getEnd()) {
            this.setAttribute("start", this.getStart());
            this.setAttribute("pause", this.getPause());
            this.setAttribute("end", this.getEnd());

            const [hours, minutes] = calcTimeCreditsForDay(
                this.getStart(),
                this.getPause(),
                this.getEnd(),
                this.getWorkPlace(),
            );

            if (hours === 0 && minutes === 0) {
                this.tagElement.textContent = "";
                this.tagElement.append(createIconElement("check")[0]);
            } else {
                const creditsForDay = hours * 60 + minutes;
                this.tagElement.textContent = `${creditsForDay > 0 ? "+" : ""}${creditsForDay} Min`;
            }

            this.tagElement.style.opacity = "1";
            return;
        }

        this.tagElement.style.opacity = "0";
    }

    onDayDataChange(detail) {
        const {day, month, year, start, end, pause, workPlace} = detail;
        if (
            this.getDay() === day &&
            this.getMonth() === month &&
            this.getYear() === year
        ) {
            if (workPlace !== "Urlaub" && workPlace !== "Krank") {
                this.setAttribute("start", start);
                this.setAttribute("pause", pause);
                this.setAttribute("end", end);
            }
            this.setAttribute("work-place", workPlace);
            this.render();
        }
    }
}
