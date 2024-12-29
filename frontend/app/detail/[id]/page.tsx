"use client";
import Base from "@/app/components/Base";
import ErrorToast from "@/app/components/ErrorToast";
import { reportsService } from "@/app/data/services";
import { ApiError } from "@/app/types/ApiError";
import { DetailReport } from "@/app/types/Report";
import { convertIDDate } from "@/app/utils/dateFormatter";
import { fetchWilayahName } from "@/app/utils/fetchWilayah";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailPage() {
  const { id } = useParams();
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [reportData, setReportData] = useState<DetailReport>();
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const loadData = async () => {
    const response = await reportsService.getDetailReport(id as string);
    if (response.data) {
      const reportResult: DetailReport = response.data;
      setReportData(reportResult);
    } else {
      setErrorData({
        code: response.code,
        message: response.message,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchAllNames = async () => {
      const province = await fetchWilayahName(reportData?.provinsi, "province");
      const regency = await fetchWilayahName(
        reportData?.kabupaten_kota,
        "regency"
      );
      const district = await fetchWilayahName(
        reportData?.kecamatan,
        "district"
      );

      setProvince(province);
      setRegency(regency);
      setDistrict(district);
    };

    fetchAllNames();
  }, [reportData]);

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <Base>
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <div className="xl:w-1/2 lg:w-3/4 md:w-full">
        <div className="flex flex-row justify-between px-4">
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-8 fill-info"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
          </Link>
        </div>
        <div className="p-10 mt-6 w-full flex flex-col gap-3 outline rounded-xl outline-2 outline-gray-300">
          <div className="flex flex-row justify-between mb-3">
            <p className="font-bold text-2xl">{reportData?.nama_program}</p>
            <p
              className={`font-bold text-lg mr-4 ${
                reportData?.status == "Disetujui"
                  ? "text-success"
                  : reportData?.status == "Ditolak"
                  ? "text-error"
                  : "text-warning"
              }`}
            >
              {reportData?.status}
            </p>
          </div>
          <div className="text-xl flex flex-row items-start gap-2">
            <li className="w-1/3 md:w-2/3">Penerima</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">{reportData?.jml_penerima}</span>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Provinsi</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">{province}</span>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Kabupaten / Kota</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">{regency}</span>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Kecamatan</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">{district}</span>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Tanggal Penyaluran</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">
              {convertIDDate(reportData?.tgl_penyaluran)}
            </span>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Bukti Penyaluran</li>
            <p className="w-fit md:text-start text-end">:</p>
            <Link
              href={`${reportData?.bukti}`}
              target="_blank"
              className="md:w-full w-2/3 underline text-blue-400 font-bold"
            >
              Unduh Bukti
            </Link>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:w-2/3">Catatan</li>
            <p className="w-fit md:text-start text-end">:</p>
            <span className="md:w-full w-2/3">{reportData?.catatan}</span>
          </div>
          {reportData?.status == "Ditolak" && (
            <div role="alert" className="alert alert-error mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white font-bold">
                Alasan : {reportData.alasan}
              </span>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}
