import { z } from "zod";
const MAX_FILE_SIZE = 2097152;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/octet-stream",
  "application/pdf",
];

export const addReportSchema = z.object({
  nama_program: z.string().min(1, { message: "Field program cannot be empty" }),
  jml_penerima: z
    .number()
    .min(0, { message: "field jumlah penerima cannot be empty" }),
  provinsi: z.string().min(1, { message: "Field provinsi cannot be empty" }),
  kabupaten_kota: z
    .string()
    .min(1, { message: "Field kabupaten/kota cannot be empty" }),
  kecamatan: z.string().min(1, { message: "Field kecamatan cannot be empty" }),
  tgl_penyaluran: z
    .string()
    .min(1, { message: "Field tanggal penyaluran cannot be empty" }),
  catatan: z.string().optional(),
  bukti: z
    .any()
    .refine((file) => file?.size > 0, `Field Bukti cannot be empty.`)
    .refine(
      (file) => !file || (file && file.size <= MAX_FILE_SIZE),
      `Max image size is 2MB.`
    )
    .refine(
      (file) => !file || (file && ACCEPTED_FILE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and pdf formats are supported."
    ),
});

export const updateReportSchema = z.object({
  nama_program: z.string().min(1, { message: "Field program cannot be empty" }),
  jml_penerima: z
    .number()
    .min(0, { message: "field jumlah penerima cannot be empty" }),
  provinsi: z.string().min(1, { message: "Field provinsi cannot be empty" }),
  kabupaten_kota: z
    .string()
    .min(1, { message: "Field kabupaten/kota cannot be empty" }),
  kecamatan: z.string().min(1, { message: "Field kecamatan cannot be empty" }),
  tgl_penyaluran: z
    .string()
    .min(1, { message: "Field tanggal penyaluran cannot be empty" }),
  catatan: z.string().optional(),
  bukti: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file && file.size <= MAX_FILE_SIZE),
      `Max image size is 2MB.`
    )
    .refine(
      (file) => !file || (file && ACCEPTED_FILE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and pdf formats are supported."
    ),
});
