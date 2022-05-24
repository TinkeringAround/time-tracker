import { createInputStyles } from "./input.style.js";

export class Input extends HTMLElement {
  static tag = "time-tracker-input";
  labelElement;
  inputElement;

  static create(label, value = "08:00") {
    const inputElement = document.createElement(Input.tag);
    inputElement.setAttribute("label", label);
    inputElement.setAttribute("value", value);
    return inputElement;
  }

  static get observedAttributes() {
    return ["blocked"];
  }

  get label() {
    return this.getAttribute("label");
  }

  set value(value) {
    this.setAttribute("value", value);
    this.inputElement.value = value;
  }

  get value() {
    return this.getAttribute("value");
  }

  set blocked(blocked) {
    if (blocked) {
      this.setAttribute("blocked", "");
      return;
    }

    this.removeAttribute("blocked");
  }

  get blocked() {
    return this.getAttribute("blocked");
  }

  constructor() {
    super();

    this.labelElement = document.createElement("label");
    this.inputElement = document.createElement("input");
    this.attachShadow({ mode: "closed" }).append(
      createInputStyles(),
      this.labelElement,
      this.inputElement
    );
  }

  connectedCallback() {
    this.labelElement.textContent = this.label;

    this.inputElement.value = this.value;
    this.inputElement.type = "time";
    this.inputElement.min = "06:00";
    this.inputElement.max = "20:00";
    this.inputElement.onchange = ({ target }) => {
      if (target) {
        this.value = target.value;
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === "") {
      this.inputElement.setAttribute("disabled", "");
    } else {
      this.inputElement.removeAttribute("disabled");
    }
  }
}
