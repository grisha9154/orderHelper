export const getDateFilter = (from?: Date, to?: Date) => {
    const date = new Date();
    const firstDay = from 
        ? from
        : new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = to 
        ? to 
        : new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { firstDay, lastDay };
}