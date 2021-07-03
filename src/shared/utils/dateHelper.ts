export enum COMPARE_TYPE {
    SMALLER_OR_EQUAL = "SmallerOrEqual",
}

const MILLISECONDS_PER_MINUTE = 60000;

export const addDays = (date: Date, addedDays: number): Date => {
    date.setDate(date.getDate() + addedDays);

    return date;
};

export const addMinutes = (date: Date, addedMinutes: number): Date => {
    date.setTime(date.getTime() + addedMinutes * MILLISECONDS_PER_MINUTE);

    return date;
};

export const compareDateTime = (
    date: Date,
    otherDate: Date,
    compareType: COMPARE_TYPE
): boolean => {
    switch (compareType) {
        case COMPARE_TYPE.SMALLER_OR_EQUAL: {
            return date <= otherDate;
        }
        default: {
            return false;
        }
    }
};
