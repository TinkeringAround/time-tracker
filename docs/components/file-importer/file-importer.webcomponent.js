import {createFileStyles} from "./file-importer.style.js";
import {Store} from "../../lib/store/store.js";
import {StoreEvents} from "../../lib/store/events.js";
import {Button} from "../button/button.webcomponent.js";

export class FileImporter extends HTMLElement {
    static tag = "time-tracker-file-importer";

    constructor() {
        super();

        const contentElement = document.createElement("div");
        const newButton = Button.create("Neuer Kalendar");
        newButton.addEventListener("click", () => {
            Store.setAllData({});
        });

        const loadButton = Button.create("Kalendar laden");
        loadButton.addEventListener("click", () => {
            fileInputElement.click();
        });

        const fileInputElement = document.createElement("input");
        fileInputElement.type = "file";
        fileInputElement.accept = "application/json";
        fileInputElement.onchange = () => {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const rawData = JSON.parse(e.target.result);
                const isOk = Object.keys(rawData).every(key => {
                    const date = key.split(".");
                    return (new Date(`${date[1]}.${date[0]}.${date[2]}`)).toDateString() !== "Invalid Date";
                });

                if (isOk) {
                    Store.setAllData(rawData);
                }
            });
            reader.readAsText(fileInputElement.files[0]);
        }

        contentElement.append(fileInputElement, newButton, loadButton);

        this.attachShadow({mode: "closed"}).append(createFileStyles(), contentElement);

        window.addEventListener(StoreEvents.loadChange, () => this.onChange());
    }

    disconnectedCallback() {
        window.removeEventListener(StoreEvents.loadChange, () => this.onChange());
    }

    connectedCallback() {
        if (!Store.loaded) {
            this.setAttribute("visible", "");
        }
    }

    onChange() {
        if (Store.loaded) {
            this.removeAttribute("visible");
        } else {
            this.setAttribute("visible", "");
        }
    }
}