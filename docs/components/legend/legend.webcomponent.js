import { createLegendStyles } from "./legend.style.js";
import { Button } from "../button/button.webcomponent.js";

export class Legend extends HTMLElement {
  static tag = "time-tracker-legend";

  static create() {
    return document.createElement(Legend.tag);
  }

  constructor() {
    super();

    const toggleElement = Button.create("Legende", "secondary");
    toggleElement.onclick = () => {
      legendElement.setAttribute("visible", "");
    };

    const legendElement = document.createElement("div");
    legendElement.setAttribute("legend", "");
    legendElement.onclick = () => {
      legendElement.removeAttribute("visible");
    };

    const legendElements = ["Büro", "Mobile Arbeit", "Krankheit", "Urlaub"].map(
      (workPlace) => {
        const legendElement = document.createElement("div");
        legendElement.setAttribute("legend-element", "");
        const spanElement = document.createElement("span");
        spanElement.textContent = workPlace;

        const divElement = document.createElement("div");
        switch (workPlace) {
          case "Büro":
            divElement.style.background = "rgb(var(--light-blue))";
            break;
          case "Mobile Arbeit":
            divElement.style.background = "rgb(var(--violet))";
            break;
          case "Krankheit":
            divElement.style.background = "rgb(var(--pink))";
            break;
          case "Urlaub":
            divElement.style.background = "rgb(var(--green))";
        }

        legendElement.append(spanElement, divElement);
        return legendElement;
      }
    );
    legendElement.append(...legendElements);

    this.attachShadow({ mode: "closed" }).append(
      createLegendStyles(),
      toggleElement,
      legendElement
    );
  }
}
