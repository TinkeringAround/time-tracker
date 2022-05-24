import { getPrevious, getNext } from "../../lib/date.js";
import { Store } from "../../lib/store/store.js";
import { IconButton } from "../icon-button/icon-button.webcomponent.js";
import { createControlsStyles } from "./controls.style.js";
import { Button } from "../button/button.webcomponent.js";

export class Controls extends HTMLElement {
  static tag = "time-tracker-controls";

  static create() {
    return document.createElement(Controls.tag);
  }

  constructor() {
    super();

    const navigationElement = document.createElement("div");
    navigationElement.setAttribute("navigation", "");

    const settingElement = document.createElement("div");
    settingElement.setAttribute("setting", "");

    const previousElement = Button.create("<");
    previousElement.addEventListener("click", () => {
      const { previousMonth, previousYear } = getPrevious(
        Store.month,
        Store.year
      );

      if (Store.mode === "month") {
        Store.setMonth(previousMonth);
        Store.setYear(previousYear);
      } else {
        Store.setYear(Store.year - 1);
      }
    });

    const nextElement = Button.create(">");
    nextElement.addEventListener("click", () => {
      const { nextMonth, nextYear } = getNext(Store.month, Store.year);

      if (Store.mode === "month") {
        Store.setMonth(nextMonth);
        Store.setYear(nextYear);
      } else {
        Store.setYear(Store.year + 1);
      }
    });

    const todayButton = Button.create("Heute");
    todayButton.title = "Zu Heute springen";
    todayButton.addEventListener("click", () => {
      Store.setMonth(Store.today.month);
      Store.setYear(Store.today.year);
    });

    const modeButton = IconButton.create(Store.mode);
    modeButton.title = "Ansicht umschalten";
    modeButton.addEventListener("click", () => {
      if (Store.mode === "month") {
        Store.setMode("year");
        modeButton.setAttribute("icon", "year");
      } else {
        Store.setMode("month");
        modeButton.setAttribute("icon", "month");
      }
    });

    const clearButton = IconButton.create("cancel");
    clearButton.title = "Verwerfen";
    clearButton.addEventListener("click", () => {
      Store.setAllData(null);
    });

    const exportButton = IconButton.create("save");
    exportButton.title = "Exportieren";
    exportButton.addEventListener("click", () => {
      const stringifiedData = JSON.stringify(Store.data);
      const dataUri =
        "data:application/json;charset=utf-8," +
        encodeURIComponent(stringifiedData);
      const exportFileDefaultName = "calendar.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      linkElement.remove();
    });

    navigationElement.append(
      previousElement,
      todayButton,
      modeButton,
      nextElement
    );

    settingElement.append(clearButton, exportButton);

    this.attachShadow({ mode: "closed" }).append(
      createControlsStyles(),
      navigationElement,
      settingElement
    );
  }
}
