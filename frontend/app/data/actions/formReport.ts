/* eslint-disable @typescript-eslint/no-explicit-any */
import { addReportSchema } from "@/app/types/ZodSchema";
import { reportsService } from "../services";

export async function addReport(prevState: any, formData: FormData) {
  const validatedFields = addReportSchema.safeParse({
    nama_program: formData.get("nama_program"),
    jml_penerima: parseInt(String(formData.get("jml_penerima"))),
    provinsi: formData.get("provinsi"),
    kabupaten_kota: String(formData.get("kabupaten_kota")),
    kecamatan: String(formData.get("kecamatan")),
    tgl_penyaluran: formData.get("tgl_penyaluran"),
    bukti: formData.get("bukti"),
    catatan: formData.get("catatan"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      isLoading: false,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      apiErrors: null,
      message: "Missing Fields. Failed to Create",
    };
  }

  const newReportData = new FormData();
  newReportData.append("nama_program", validatedFields.data.nama_program);
  newReportData.append(
    "jml_penerima",
    String(validatedFields.data.jml_penerima)
  );
  newReportData.append("provinsi", validatedFields.data.provinsi);
  newReportData.append("kabupaten_kota", validatedFields.data.kabupaten_kota);
  newReportData.append("kecamatan", validatedFields.data.kecamatan);
  newReportData.append("tgl_penyaluran", validatedFields.data.tgl_penyaluran);
  newReportData.append("catatan", validatedFields.data.catatan || "");
  newReportData.append("bukti", validatedFields.data.bukti);

  const response = await reportsService.addReport(newReportData);
  if (!response) {
    return {
      ...prevState,
      isLoading: false,
      apiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (response.statusCode !== 201) {
    return {
      ...prevState,
      isLoading: false,
      isError: true,
      apiErrors: {
        code: response.code,
        message: response.message
      },
      zodErrors: null,
      message: "Failed to create books",
    };
  }

  return {
    isLoading: false,
    isSuccess: true,
    apiErrors: null,
    zodErrors: null,
    message: response.message,
  };

}
