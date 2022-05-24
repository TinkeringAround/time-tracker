export const DropdownEvents = {
  change: "dropdown-change",
};

export class DropdownChangeEvent extends CustomEvent {
  constructor(value) {
    super(DropdownEvents.change, {
      detail: { value },
    });
  }
}
