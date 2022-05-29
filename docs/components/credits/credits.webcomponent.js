import {Store} from "../../lib/store/store.js";
import {StoreEvents} from "../../lib/store/events.js";
import {createCreditsStyles} from "./credits.style.js";
import {createIconElement} from "../icon-button/icons.js";
import {calcTimeCredits, getAllListedYears} from "../../lib/date.js";

export class Credits extends HTMLElement {
    static tag = "time-tracker-credits";
    iconElement;
    creditsElement;
    overlayElement;
    contentElement;

    static create() {
        return document.createElement(Credits.tag);
    }

    constructor() {
        super();

        this.creditsElement = document.createElement("span");
        [this.iconElement] = createIconElement("time");

        this.overlayElement = document.createElement("div");
        this.overlayElement.setAttribute("overlay", "");
        this.overlayElement.style.display = "none";

        // Header
        const overlayHeaderElement = document.createElement("h1");
        overlayHeaderElement.textContent = "Gleitzeitkonto";

        // Content
        this.contentElement = document.createElement("div");
        this.contentElement.setAttribute("content", "");

        // Divider
        const dividerElement = document.createElement("hr");

        this.overlayElement.append(
            overlayHeaderElement,
            this.contentElement,
            dividerElement,
        );

        this.attachShadow({mode: "closed"}).append(
            createCreditsStyles(),
            this.iconElement,
            this.creditsElement,
            this.overlayElement
        );

        this.addEventListener("click", () => {
            if (this.overlayElement.style.display === "flex") {
                this.overlayElement.style.display = "none";
            } else {
                this.overlayElement.style.display = "flex";
            }
        })

        window.addEventListener(StoreEvents.dayDataChange, () => this.onChange());
    }

    connectedCallback() {
        this.updateAttributes();
        this.updateOverlay();
    }

    disconnectedCallback() {
        window.removeEventListener(StoreEvents.dayDataChange, () => this.onChange());
    }

    onChange() {
        this.updateAttributes();
        this.updateOverlay();
    }

    updateAttributes() {
        this.creditsElement.textContent = `${Math.abs(Store.credits)} Min`;

        if (Store.credits >= 0) {
            this.setAttribute("credits", "positive");
        } else {
            this.setAttribute("credits", "negative");
        }
    }

    updateOverlay() {
        const oldYearElements = this.contentElement.querySelectorAll("div[year-element]");
        const oldTotalElement = this.overlayElement.querySelector("div[total]");
        [...oldYearElements, oldTotalElement].forEach(oldElement => oldElement?.remove());

        this.contentElement.append(
            ...getAllListedYears(Store.data).map(year => {
                    const yearElement = document.createElement("div");
                    yearElement.setAttribute("year-element", "");

                    const h2Element = document.createElement("h2");
                    h2Element.textContent = year;

                    const spanElement = document.createElement("span");
                    const creditsForYear = calcTimeCredits(Store.data, year);
                    spanElement.textContent = `${creditsForYear >= 0 ? "+" : ""}${creditsForYear} Min`;

                    yearElement.append(h2Element, spanElement);
                    return yearElement;
                }
            )
        );

        // Total
        const totalElement = document.createElement("div");
        totalElement.setAttribute("total", "");

        const h2Element = document.createElement("h2");
        h2Element.textContent = "Total";

        const spanElement = document.createElement("span");
        const creditsForYear = Store.credits;
        spanElement.textContent = `${creditsForYear >= 0 ? "+" : ""}${creditsForYear} Min`;

        totalElement.append(h2Element, spanElement);

        this.overlayElement.append(totalElement);
    }
}