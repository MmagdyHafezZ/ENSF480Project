// utils.js
export const formatDate = (date) => {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear().toString().substr(-2);

  return `${month}/${day}/${year}`;
};
