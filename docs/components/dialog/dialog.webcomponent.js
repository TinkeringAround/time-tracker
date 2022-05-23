import {createDialogStyles} from "./dialog.style.js";
import {DialogCloseEvent, DialogEvents} from "./events.js";
import {Button} from "../button/button.webcomponent.js";
import {Input} from "../input/input.webcomponent.js";
import {Dropdown} from "../dropdown/dropdown.webcomponent.js";
import {Store} from "../../lib/store/store.js";

export class Dialog extends HTMLElement {
    static tag = "time-tracker-dialog";
    formElement;
    startInputElement;
    pauseInputElement;
    endInputElement;
    dropdownElement;
    dateData;

    constructor() {
        super();

        const contentElement = document.createElement("div");
        [this.formElement, this.startInputElement, this.pauseInputElement, this.endInputElement, this.dropdownElement] =
            Dialog.initializeForm();
        const footerElement = Dialog.initializeFooter();
        contentElement.append(this.formElement, footerElement);

        // Events
        window.addEventListener(DialogEvents.open, (event) => this.onOpen(event.detail));
        window.addEventListener(DialogEvents.close, (event) => this.onClose(event.detail.apply));

        this.attachShadow({mode: "closed"}).append(createDialogStyles(), contentElement);
    }

    disconnectedCallback() {
        window.removeEventListener(DialogEvents.open, () => this.onOpen());
        window.removeEventListener(DialogEvents.close, () => this.onClose());
    }

    onOpen(dateData) {
        this.dateData = dateData;
        const {start, end, pause, workPlace} = dateData;

        this.startInputElement.value = start ?? "08:00";
        this.pauseInputElement.value = pause ?? "00:40";
        this.endInputElement.value = end ?? "15:40";
        this.dropdownElement.value = workPlace ?? "Büro";

        this.setAttribute("visible", "");
    }

    onClose(apply) {
        if (apply) {
            const start = this.formElement.querySelector('[label="Start"]').value;
            const end = this.formElement.querySelector('[label="Ende"]').value;
            const pause = this.formElement.querySelector('[label*="Pause"]').value;
            const workPlace = this.formElement.querySelector('[label="Arbeitsort"]').value;

            const {day, month, year} = this.dateData;
            Store.setDateData(day, month, year, start, pause, end, workPlace);
        }

        this.removeAttribute("visible");
    }

    static initializeFooter() {
        const footerElement = document.createElement("footer");

        const closeButtonElement = Button.create("Schließen", "tertiary");
        closeButtonElement.addEventListener("click", () => {
            window.dispatchEvent(new DialogCloseEvent());
        });
        const applyButtonElement = Button.create("Speichern");
        applyButtonElement.addEventListener("click", () => {
            window.dispatchEvent(new DialogCloseEvent(true));
        });

        footerElement.append(closeButtonElement, applyButtonElement);
        return footerElement;
    }

    static initializeForm() {
        const formElement = document.createElement("form");

        const headingElement = document.createElement("h1");
        headingElement.textContent = "Anwesenheit pflegen";

        const startInputElement = Input.create("Start");
        startInputElement.style.gridArea = "start";
        const pauseInputElement = Input.create("Pause", "00:00");
        pauseInputElement.style.gridArea = "pause";
        const endInputElement = Input.create("Ende", "15:40");
        endInputElement.style.gridArea = "end";

        const dropdownElement = Dropdown.create("Arbeitsort", "Büro", ["Büro", "Mobile Arbeit", "Krankheit", "Urlaub"]);
        dropdownElement.style.gridArea = "dropdown";

        formElement.append(headingElement, startInputElement, pauseInputElement, endInputElement, dropdownElement);
        return [formElement, startInputElement, pauseInputElement, endInputElement, dropdownElement];
    }
}