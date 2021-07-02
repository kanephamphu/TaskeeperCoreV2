export enum COMPARE_TYPE {
    SMALLER_OR_EQUAL = "SmallerOrEqual",
}

export const addDays = (date: Date, addedDays: number): Date => {
    date.setDate(date.getDate() + addedDays);

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
