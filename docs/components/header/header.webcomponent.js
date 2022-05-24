import { createHeaderStyles } from "./header.style.js";
import { months } from "../../lib/date.js";
import { Store } from "../../lib/store/store.js";
import { StoreEvents } from "../../lib/store/events.js";
import { Controls } from "../controls/controls.webcomponent.js";
import { Legend } from "../legend/legend.webcomponent.js";

export class Header extends HTMLElement {
  static tag = "time-tracker-header";
  monthHeading;
  yearSpan;

  constructor() {
    super();

    this.monthHeading = document.createElement("h1");
    this.yearSpan = document.createElement("span");

    this.attachShadow({ mode: "closed" }).append(
      createHeaderStyles(),
      this.monthHeading,
      this.yearSpan,
      Legend.create(),
      Controls.create()
    );

    window.addEventListener(StoreEvents.modeChange, () => this.onChange());
    window.addEventListener(StoreEvents.monthChange, () => this.onChange());
    window.addEventListener(StoreEvents.yearChange, () => this.onChange());
  }

  connectedCallback() {
    this.onChange();
  }

  disconnectedCallback() {
    window.removeEventListener(StoreEvents.modeChange, () => this.onChange());
    window.removeEventListener(StoreEvents.monthChange, () => this.onChange());
    window.removeEventListener(StoreEvents.yearChange, () => this.onChange());
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
