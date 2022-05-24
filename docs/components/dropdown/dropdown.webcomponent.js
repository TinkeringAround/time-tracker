import { createDropdownStyles } from "./dropdown.style.js";
import { DropdownChangeEvent } from "./events.js";

export class Dropdown extends HTMLElement {
  static tag = "time-tracker-dropdown";
  shadowRoot;
  selectElement;

  static create(name, value, options) {
    const dropDownElement = document.createElement(Dropdown.tag);
    dropDownElement.label = name;
    dropDownElement.value = value;
    dropDownElement.options = options;

    return dropDownElement;
  }

  set label(label) {
    this.setAttribute("label", label);
  }

  get label() {
    return this.getAttribute("label");
  }

  set value(value) {
    this.setAttribute("value", value);

    if (this.selectElement) {
      this.selectElement.value = value;
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set options(options) {
    this.setAttribute("options", options);
  }

  get options() {
    return this.getAttribute("options").split(",");
  }

  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: "open" });
    this.shadowRoot.append(createDropdownStyles());
  }

  connectedCallback() {
    const labelElement = document.createElement("label");
    labelElement.textContent = this.label;

    this.selectElement = document.createElement("select");
    this.selectElement.name = this.label;
    this.selectElement.value = this.value;
    this.selectElement.onchange = (event) => {
      if (event.target) {
        this.value = event.target.value;
        this.dispatchEvent(new DropdownChangeEvent(event.target.value));
      }
    };

    this.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      optionElement.selected = option === this.value;
      this.selectElement.options.add(optionElement);
    });

    this.shadowRoot.append(labelElement, this.selectElement);
  }
}
