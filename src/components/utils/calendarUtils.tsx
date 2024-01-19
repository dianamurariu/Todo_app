export const formatCurrentDate = (date: {
  getDate: () => any;
  getMonth: () => any;
}) => {
  // Extract day of the month and month index from the date
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Combine day and month name to form the formatted date

  return `${dayOfMonth}${monthNames[monthIndex]}`;
};
