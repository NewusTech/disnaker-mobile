export function formatDateDMY(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}/${month}/${year}`;
}
export function formatDateYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const formatDate = (
  date?: number | Date | undefined,
  options: Intl.DateTimeFormatOptions | undefined = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string => {
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
  options: {
    showYears?: boolean;
    showMonths?: boolean;
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
  } = {}
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Hitung total perbedaan dalam tahun, bulan, dan hari
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();

  // Jika selisih hari, jam, atau menit negatif, sesuaikan hasilnya
  if (minutes < 0) {
    hours--;
    minutes += 60; // Tambahkan 60 menit jika negatif
  }

  if (hours < 0) {
    days--;
    hours += 24; // Tambahkan 24 jam jika negatif
  }

  if (days < 0) {
    months--;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate(); // Tambahkan jumlah hari dari bulan sebelumnya
  }

  if (months < 0) {
    years--;
    months += 12; // Tambahkan 12 bulan jika bulan negatif
  }

  // Format keluaran
  const result: string[] = [];

  if (options.showYears !== false && years > 0) {
    result.push(`${years} tahun`);
  }

  if (options.showMonths !== false && months > 0) {
    result.push(`${months} bulan`);
  }

  if (options.showDays !== false && days > 0) {
    result.push(`${days} hari`);
  }

  if (options.showHours !== false && hours > 0) {
    result.push(`${hours} jam`);
  }

  if (options.showMinutes !== false && minutes > 0) {
    result.push(`${minutes} menit`);
  }

  // Jika tidak ada hasil, tampilkan "0 menit"
  return result.length > 0 ? result.join(" ") : "0 menit";
}
