// Subtract years from current Date object and return the new Date
export const isAtleast18YearsOld = (date: Date) => {
    const currentDate = new Date();
    const ageLimitDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate(),
    );
    return date <= ageLimitDate;
};
