// Subtract years from current Date object and return the new Date
export const subYears = (date: Date, years: number) => {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() - years);
    return dateCopy;
};
