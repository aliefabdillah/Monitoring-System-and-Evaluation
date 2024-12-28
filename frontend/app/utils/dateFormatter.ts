export function convertInputDate(inputDate: string | undefined): string {
  if (!inputDate) return ""; // Mengembalikan string kosong jika inputDate undefined

  // Check if inputDate is in the expected format (MM/DD/YYYY)
  const date = new Date(inputDate);
  const isoString = date.toISOString().split("T")[0];
  return isoString;
}