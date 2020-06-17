import { PlaningCalendar, PlaningDay, CalendarMetadata } from "../model/Calendar";

// TODO: Docs
// TODO: Tests
export const createWorkingPlan = (year: number, month: number):PlaningCalendar => {
    let result = {} as PlaningCalendar;
    result.year = year;
    result.month = month;
    result.days = new Array<PlaningDay>();
    result.metadata = {} as CalendarMetadata;

    const daysOfMonth = getDaysArray(2020, month);
    daysOfMonth.forEach((element, index) => {
        let planDay = {} as PlaningDay;
        planDay.day = element;
        planDay.active = true;
        planDay.morning = [];
        planDay.afternoon = [];
        planDay.night = [];
        result.days.push(planDay);
    });

    //Fill up first week with days from last month
    let dayOfWeekFirstDay = new Date(year, month-1, 1).getDay();
    if(dayOfWeekFirstDay === 0) dayOfWeekFirstDay = 7;
    for (let index = 1; index < dayOfWeekFirstDay; index++) {
        let planDay = {} as PlaningDay;
        planDay.day = -1;
        planDay.active = false;
        planDay.morning = [];
        planDay.afternoon = [];
        planDay.night = [];
        result.days.unshift(planDay);
    }

    //Fill up last week with days from next month
    let dayOfWeekLastDay = new Date(year, month, 0).getDay();
    if(dayOfWeekLastDay > 0) {
        for (let index = 0; index < 7 - dayOfWeekLastDay; index++) {
            let planDay = {} as PlaningDay;
            planDay.day = -1;
            planDay.active = false;
            planDay.morning = [];
            planDay.afternoon = [];
            planDay.night = [];
            result.days.push(planDay);
        }
    }

    return result;
}

const getDaysArray = (year: number, month: number): number[] => {
    let monthIndex = month - 1; // 0..11 instead of 1..12
    let date = new Date(year, monthIndex, 1);
    let result = [];
    while (date.getMonth() === monthIndex) {
        result.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }
    return result;
};

// TODO: L10N
export const namesOfDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];