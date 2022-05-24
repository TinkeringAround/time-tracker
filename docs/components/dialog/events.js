export const DialogEvents = {
  open: "dialog-open",
  close: "dialog-close",
};

export class DialogOpenEvent extends CustomEvent {
  constructor(day, month, year, start, end, pause, workPlace) {
    super(DialogEvents.open, {
      detail: { day, month, year, start, end, pause, workPlace },
    });
  }
}

export class DialogCloseEvent extends CustomEvent {
  constructor(apply = false) {
    super(DialogEvents.close, { detail: { apply } });
  }
}
