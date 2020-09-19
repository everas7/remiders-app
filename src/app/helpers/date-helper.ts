export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }
  return false;
};

export const isSameMonth = (aDate: Date, bDate: Date): boolean => {
  return aDate.getMonth() === bDate.getMonth();
};
