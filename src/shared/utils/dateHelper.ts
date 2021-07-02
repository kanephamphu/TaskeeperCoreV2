export const addDays = (date: Date, addedDays: number): Date => {
    date.setDate(date.getDate() + addedDays);

    return date;
};
