export const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

export const separateDate = (day, month, year) => {
    let date = new Date();
    if (day > 0 && month >= 0 && year >= 0) {
        date = new Date(`${month + 1}.${day}.${year}`);
    }

    return {
        dayOfWeek: date.getDay(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        day: date.getUTCDate(),
    };
};

export const isToday = (day, month, year) => {
    const today = separateDate();
    return today.day === day && today.month === month && today.year === year;
};

export const toDateString = (day, month, year) => {
    return new Date(`${month + 1}.${day}.${year}`).toLocaleDateString();
};

export const transformDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    return toDateString(day + 1, month, year);
};

export const getPrevious = (month, year) => ({
    previousMonth: month === 0 ? 11 : month - 1,
    previousYear: month === 0 ? year - 1 : year,
});

export const getNext = (month, year) => ({
    nextMonth: month === 11 ? 0 : month + 1,
    nextYear: month === 11 ? year + 1 : year,
});

const splitTime = (time) => time.split(":").map((segment) => parseInt(segment));

export const getAllListedYears = (storedData) => {
    const years = {};

    Object.keys(storedData).forEach(date => {
        const year = date.split(".")[2];

        if (!years[year]) {
            years[year] = true;
        }
    });

    return Object.keys(years);
}

export const calcTimeCreditsForDay = (start, pause, end, workPlace) => {
    if (workPlace === "Gleitzeit") {
        return [-7, 0];
    }

    const workTime = splitTime(end);
    [start, pause]
    .map((time) => splitTime(time))
        .forEach((time) => {
            time.forEach((segment, i) => {
                workTime[i] -= segment;
            });
        });

    // apply correction
    if (workTime[1] < 0) {
        workTime[0]--;
        workTime[1] += 60;
    }

    workTime[0] -= 7;
    if (workTime[0] < 0 && workTime[1] > 0) {
        workTime[0] += 1;
        workTime[1] -= 60;
    }

    return workTime;
};

export const calcTimeCredits = (storeData, year = null) => {
    let hours = 0;
    let minutes = 0;

    Object.keys(storeData)
        .filter(date => year ? date.includes(`.${year}`) : true)
        .map(date => storeData[date])
        .filter(({ workPlace }) => workPlace && workPlace !== "Krank" && workPlace !== "Urlaub")
        .forEach(data => {
            const { start, pause, end, workPlace } = data;
            const [workTimeHours, workTimeMinutes] = calcTimeCreditsForDay(start, pause, end, workPlace);

            hours += workTimeHours;
            minutes += workTimeMinutes;
        });

    // apply correction
    if (hours > 0 && minutes < 0) {
        const minusHours = Math.round(minutes / 60) + 1;
        minutes += (minusHours * 60);
        hours -= minusHours;
    } else if (hours < 0 && minutes > 0) {
        const plusHours = Math.round(minutes / 60) + 1;
        minutes -= (plusHours * 60);
        hours += plusHours;
    }

    return hours * 60 + minutes;
}

export const workPlaces = ["Büro", "Mobile Arbeit", "Gleitzeit", "Freier Tag", "Krank", "Urlaub"];
export const days_short = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
];