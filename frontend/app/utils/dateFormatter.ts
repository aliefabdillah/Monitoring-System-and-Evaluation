export function convertInputDate(inputDate: string | undefined): string {
  if (!inputDate) return ""; // Mengembalikan string kosong jika inputDate undefined

  const date = new Date(inputDate);
  const isoString = date.toISOString().split("T")[0];
  return isoString;
}

export function convertIDDate(paramDate: string | undefined): string{
  if (!paramDate) return "";

  const date = new Date(paramDate)
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}