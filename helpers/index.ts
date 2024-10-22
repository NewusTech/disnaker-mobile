export * from "./downloadFile";

export const removeHtmlTags = (text: string, maxLength: number) => {
  // Hapus semua tag HTML
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Potong teks sesuai panjang yang ditentukan, tambahkan "..." jika melebihi batas
  if (cleanText.length > maxLength) {
    return cleanText.substring(0, maxLength) + "...";
  }

  return cleanText;
};
