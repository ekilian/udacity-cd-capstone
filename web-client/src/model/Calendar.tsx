// Data structure for a planing Calendar.
export interface PlaningCalendar {
    year:number;
    month:number;
    days:Array<PlaningDay>;
    metadata:CalendarMetadata;
}

// Representing one day in a planing calendar.
export interface PlaningDay {
    day:number;
    morning:string[];
    afternoon:string[];
    night:string[];
    free?:string[];
    active:boolean;
}

export interface CalendarMetadata {
    createdBy:string;
    created:Date;
    editedBy?:string;
    editedOn?:Date;
}