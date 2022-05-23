import {createHeaderStyles} from "./header.style.js";
import {Button} from "../button/button.webcomponent.js";
import {getNext, getPrevious, months} from "../../lib/date.js";
import {Store} from "../../lib/store/store.js";
import {StoreEvents} from "../../lib/store/events.js";
import {IconButton} from "../icon-button/icon-button.webcomponent.js";

export class Header extends HTMLElement {
    static tag = "time-tracker-header";
    monthHeading;
    yearSpan;

    constructor() {
        super();

        this.monthHeading = document.createElement("h1");
        this.yearSpan = document.createElement("span");

        const legendElement = document.createElement("div");
        legendElement.setAttribute("legend", "");
        const legendElements = ["Krankheit", "Mobile Arbeit", "Urlaub"].map(workPlace => {
            const legendElement = document.createElement("div");
            legendElement.setAttribute("legend-element", "");
            const spanElement = document.createElement("span");
            spanElement.textContent = workPlace;

            const divElement = document.createElement("div");
            switch (workPlace) {
                case "Krankheit":
                    divElement.style.background = "rgb(var(--pink))";
                    break;
                case "Mobile Arbeit":
                    divElement.style.background = "rgb(var(--light-blue))";
                    break;
                case "Urlaub":
                    divElement.style.background = "rgb(var(--green))";
            }

            legendElement.append(spanElement, divElement);
            return legendElement;
        });
        legendElement.append(...legendElements);

        const previousMonthElement = Button.create("<", "secondary");
        previousMonthElement.addEventListener("click", () => {
            const {previousMonth, previousYear} = getPrevious(Store.month, Store.year);

            if (Store.mode === "month") {
                Store.setMonth(previousMonth);
                Store.setYear(previousYear);
            } else {
                Store.setYear(Store.year - 1);
            }
        });

        const nextMonthElement = Button.create(">", "secondary");
        nextMonthElement.addEventListener("click", () => {
            const {nextMonth, nextYear} = getNext(Store.month, Store.year);

            if (Store.mode === "month") {
                Store.setMonth(nextMonth);
                Store.setYear(nextYear);
            } else {
                Store.setYear(Store.year + 1);
            }
        });

        const todayButton = Button.create("Heute");
        todayButton.addEventListener("click", () => {
            Store.setMonth(Store.today.month);
            Store.setYear(Store.today.year);
        });

        const toggleIcon = IconButton.create(Store.mode);
        toggleIcon.title = "Ansicht umschalten";
        toggleIcon.addEventListener("click", () => {
            if (Store.mode === "month") {
                Store.setMode("year");
                toggleIcon.setAttribute("icon", "year");
            } else {
                Store.setMode("month");
                toggleIcon.setAttribute("icon", "month");
            }
        });

        const cancelButton = IconButton.create("cancel");
        cancelButton.title = "Verwerfen";
        cancelButton.addEventListener("click", () => {
            Store.setAllData(null);
        });
        const exportButton = IconButton.create("save");
        exportButton.title = "Exportieren";
        exportButton.addEventListener("click", () => {
            const stringifiedData = JSON.stringify(Store.data);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(stringifiedData);
            const exportFileDefaultName = 'calendar.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            linkElement.remove();
        });

        this.attachShadow({mode: "closed"}).append(
            createHeaderStyles(),
            this.monthHeading,
            this.yearSpan,
            legendElement,
            previousMonthElement,
            todayButton,
            nextMonthElement,
            toggleIcon,
            cancelButton,
            exportButton
        );

        window.addEventListener(StoreEvents.modeChange, () => this.onChange())
        window.addEventListener(StoreEvents.monthChange, () => this.onChange())
        window.addEventListener(StoreEvents.yearChange, () => this.onChange())
    }

    connectedCallback() {
        this.onChange();
    }

    disconnectedCallback() {
        window.removeEventListener(StoreEvents.modeChange, () => this.onChange())
        window.removeEventListener(StoreEvents.monthChange, () => this.onChange());
        window.removeEventListener(StoreEvents.yearChange, () => this.onChange())
    }

    renderHeading(month, year) {
        this.monthHeading.textContent = months[month];
        this.yearSpan.textContent = year;
    }

    onChange() {
        if (Store.mode === "month") {
            this.renderHeading(Store.month, Store.year);
        } else {
            this.monthHeading.textContent = "Jahr";
            this.yearSpan.textContent = Store.year;
        }
    }
}