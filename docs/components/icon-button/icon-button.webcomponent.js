import { createIconElement, icons } from "./icons.js";
import { Store } from "../../lib/store/store.js";
import { createIconButtonStyles } from "./icon-button.style.js";

export class IconButton extends HTMLElement {
  static tag = "time-tracker-icon-button";
  svgElement;
  pathElement;

  static get observedAttributes() {
    return ["icon"];
  }

  static create(icon) {
    const iconElement = document.createElement(IconButton.tag);
    iconElement.icon = icon;
    return iconElement;
  }

  set icon(icon) {
    this.setAttribute("icon", icon);
  }

  get icon() {
    return this.getAttribute("icon");
  }

  constructor() {
    super();

    [this.svgElement, this.pathElement] = createIconElement(Store.mode);
    this.attachShadow({ mode: "closed" }).append(
      createIconButtonStyles(),
      this.svgElement
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.svgElement.setAttribute("title", icons[newValue].title);
    this.svgElement.setAttribute("viewBox", icons[newValue].viewBox);
    this.pathElement.setAttribute("d", icons[newValue].d);
  }

  connectedCallback() {
    this.setAttribute("icon", this.icon);
    this.svgElement.setAttribute("title", icons[this.icon].title);
    this.svgElement.setAttribute("viewBox", icons[this.icon].viewBox);
    this.pathElement.setAttribute("d", icons[this.icon].d);
  }
}
