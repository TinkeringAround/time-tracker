export const StoreEvents = {
    loadChange: "store-all-load-change",
    modeChange: "store-mode-change",
    monthChange: "store-month-change",
    yearChange: "store-year-change",
    dayDataChange: "store-day-data-change"
}

export class StoreLoadChangeEvent extends CustomEvent {
    constructor() {
        super(StoreEvents.loadChange);
    }
}

export class StoreModeChangeEvent extends CustomEvent {
    constructor() {
        super(StoreEvents.modeChange);
    }
}

export class StoreMonthChangeEvent extends CustomEvent {
    constructor() {
        super(StoreEvents.monthChange);
    }
}

export class StoreYearChangeEvent extends CustomEvent {
    constructor() {
        super(StoreEvents.yearChange);
    }
}

export class StoreDayDataChangeEvent extends CustomEvent {
    constructor(day, month, year, start, end, pause, workPlace) {
        super(StoreEvents.dayDataChange, {detail: {day, month, year, start, end, pause, workPlace}});
    }
}