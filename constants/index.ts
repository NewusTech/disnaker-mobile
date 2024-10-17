export const API_URL = process.env.EXPO_PUBLIC_API_URL;
export const DEVELOPMENT_MODE =
  process.env.EXPO_PUBLIC_DEVELOPMENT_MODE === "true";

export const dataLinkPendukung = [
  { title: "instagram", image: require("@/assets/images/instagram.png") },
  { title: "facebook", image: require("@/assets/images/facebook.png") },
  { title: "twitter", image: require("@/assets/images/www.png") },
  { title: "linkedin", image: require("@/assets/images/www.png") },
  { title: "portofolio", image: require("@/assets/images/www.png") },
];

export const formatCurrency = (amount: number) => {
  // Check if the number is valid
  if (isNaN(amount)) {
    amount = 0;
  }

  // Create Intl.NumberFormat object for Indonesian Rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format the number into IDR currency
  return formatter.format(amount);
};

export enum employmentStatus {
  "Sudah Bekerja" = "Sudah Bekerja",
  "Siap Bekerja" = "Siap Bekerja",
  "Tidak Bekerja" = "Tidak Bekerja",
}
export enum maritalStatus {
  "Menikah" = "Menikah",
  "Belum Menikah" = "Belum Menikah",
}
export enum gender {
  "Laki-laki" = "Laki-laki",
  "Perempuan" = "Perempuan",
}
