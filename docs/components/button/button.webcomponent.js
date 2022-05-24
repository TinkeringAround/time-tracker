import { createButtonStyles } from "./button.style.js";

export class Button extends HTMLElement {
  static tag = "time-tracker-button";
  buttonElement;

  static create(content, variant = "primary") {
    const buttonElement = document.createElement(Button.tag);
    buttonElement.content = content;
    buttonElement.variant = variant;
    return buttonElement;
  }

  set content(content) {
    this.buttonElement.textContent = content;
  }

  set variant(variant) {
    this.setAttribute("variant", variant);
  }

  get variant() {
    return this.getAttribute("variant");
  }

  constructor() {
    super();

    this.buttonElement = document.createElement("button");
    this.buttonElement.setAttribute("part", "button");
    this.attachShadow({ mode: "closed" }).append(
      createButtonStyles(),
      this.buttonElement
    );
  }

  connectedCallback() {
    this.setAttribute("variant", this.variant);
  }
}
