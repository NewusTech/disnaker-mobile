export function formatDateDMY(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
