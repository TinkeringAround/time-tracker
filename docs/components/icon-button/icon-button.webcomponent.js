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
    this.pathElement.setAttribute("d", icons[newValue]);
  }

  connectedCallback() {
    this.setAttribute("icon", this.icon);
    this.pathElement.setAttribute("d", icons[this.icon]);
  }
}
