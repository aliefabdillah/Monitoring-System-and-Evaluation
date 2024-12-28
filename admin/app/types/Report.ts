export type ListReport = {
  id: string,
  nama_program: string,
  jml_penerima: number,
  provinsi: string,
  kabupaten_kota: string,
  kecamatan: string,
  status: string,
}

export type DetailReport = {
  id: string,
  nama_program: string,
  jml_penerima: number,
  provinsi: string,
  kabupaten_kota: string,
  kecamatan: string,
  tgl_penyaluran: string,
  bukti: string,
  alasan?: string,
  catatan?: string,
  status: string,
}