import {Calendar} from "./calendar/calendar.webcomponent.js";
import {Day} from "./day/day.webcomponent.js";
import {Header} from "./header/header.webcomponent.js";
import {Button} from "./button/button.webcomponent.js";
import {Dropdown} from "./dropdown/dropdown.webcomponent.js";
import {Dialog} from "./dialog/dialog.webcomponent.js";
import {Input} from "./input/input.webcomponent.js";
import {Month} from "./month/month.webcomponent.js";
import {FileImporter} from "./file-importer/file-importer.webcomponent.js";
import {IconButton} from "./icon-button/icon-button.webcomponent.js";

customElements.define(Button.tag, Button);
customElements.define(Header.tag, Header)
customElements.define(Calendar.tag, Calendar);
customElements.define(Day.tag, Day);
customElements.define(Dropdown.tag, Dropdown);
customElements.define(Dialog.tag, Dialog);
customElements.define(Input.tag, Input);
customElements.define(Month.tag, Month);
customElements.define(FileImporter.tag, FileImporter);
customElements.define(IconButton.tag, IconButton);