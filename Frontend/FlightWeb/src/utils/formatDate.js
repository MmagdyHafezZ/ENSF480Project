// utils.js
export const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1); // Month is 0-indexed
  let day = "" + d.getDate();
  const year = d.getFullYear();

  // Add leading zero to single-digit months and days
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
