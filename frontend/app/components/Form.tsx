"use client";
import axios from "axios";
import Link from "next/link";
import React, { Suspense, useActionState, useEffect, useState } from "react";
import { addReport, updateReport } from "../data/actions/formReport";
import ZodErrors from "./ZodErrors";
import ErrorToast from "./ErrorToast";
import { ApiError } from "../types/ApiError";
import SuccessModal from "./SuccessModal";
import { useRouter, useSearchParams } from "next/navigation";
import ModalLoadingLite from "./ModalLoading";
import { reportsService } from "../data/services";
import { DetailReport } from "../types/Report";
import { convertInputDate } from "../utils/dateFormatter";

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

export default function Form() {
  const router = useRouter();
  const queryParams = useSearchParams();
  const edit = queryParams.get("edit");
  const reportId = queryParams.get("report");

  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const [formAddState, formAddAction] = useActionState(addReport, {
    data: null,
  });
  const [formEditState, formEditAction] = useActionState(updateReport, {
    data: null,
  });
  const [file, setFile] = useState<File>();
  const [formReportState, setFormReportState] = useState<DetailReport>({
    id: "",
    nama_program: "",
    jml_penerima: 0,
    provinsi: "",
    kabupaten_kota: "",
    kecamatan: "",
    tgl_penyaluran: "",
    catatan: "",
    bukti: "",
    status: "",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Fetch Provinces
  useEffect(() => {
    axios
      .get<Province[]>(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      )
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch Regencies when Province changes
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get<Regency[]>(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
        )
        .then((res) => {
          setRegencies(res.data);
          setDistricts([]);
          setSelectedRegency(formReportState.kabupaten_kota || "");
          setSelectedDistrict("");
        })
        .catch((err) => console.error(err));
    }
  }, [formReportState.kabupaten_kota, selectedProvince]);

  // Fetch Districts when Regency changes
  useEffect(() => {
    if (selectedRegency) {
      axios
        .get<District[]>(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
        )
        .then((res) => {
          setDistricts(res.data);
          setSelectedDistrict(formReportState.kecamatan || "");
        })
        .catch((err) => console.error(err));
    }
  }, [formReportState.kecamatan, selectedRegency]);

  useEffect(() => {
    if (edit) {
      loadEditedData();
    }

    if (!formAddState.isLoading || !formEditState.isLoading) {
      setIsLoading(false);
    }

    if (formAddState.isError || formEditState.isError) {
      setErrorData({
        code: formAddState?.apiErrors?.code || formEditState?.apiErrors?.code,
        message: formAddState?.apiErrors?.message || formEditState?.apiErrors?.message,
      });
      setIsToastOpen(true);
    }

    if (formAddState.isSuccess || formEditState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [edit, formAddState, formEditState, router]);

  const loadEditedData = async () => {
    const response = await reportsService.getDetailReport(reportId as string);
    if (response.data) {
      const reportResult: DetailReport = response.data;
      setFormReportState(reportResult);
      setSelectedProvince(reportResult.provinsi);
      setSelectedRegency(reportResult.kabupaten_kota);
      setSelectedDistrict(reportResult.kecamatan);
    } else {
      setErrorData({
        code: response.code,
        message: response.message,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormReportState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files?.[0]);
    }
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <Suspense>
      <ModalLoadingLite isOpen={isLoading} />
      <SuccessModal message={formAddState?.message || formEditState?.message} />
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <form
        className="outline-1 outline outline-zinc-400 h-full w-2/3 py-4 px-7 rounded-md"
        action={edit ? formEditAction : formAddAction}
        onSubmit={() => setIsLoading(true)}
      >
        <h1 className="text-center font-poppins font-semibold text-xl my-4">
          {edit ? "Edit" : "Add"} Report
        </h1>
        {edit && (
          <input
            type="text"
            placeholder="Type here"
            name="id"
            className="input input-bordered w-full"
            value={formReportState.id}
            onChange={handleInputChange}
            hidden
          />
        )}
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Nama Program <span className="text-red-700">*</span>
            </span>
          </div>
          <select
            className="select select-bordered join-item"
            value={formReportState.nama_program}
            onChange={handleInputChange}
            name="nama_program"
          >
            <option value={""} hidden>
              Pilih program
            </option>
            <option value="BPNT">Bantuan Pangan Non Tunai (BPNT)</option>
            <option value="PIP">Program Indonesia Pintar (PIP)</option>
            <option value="JKN_KIS">
              Jaminan Kesehatan Nasional - Kartu Indonesia Sehat (JKN-KIS)
            </option>
            <option value="BST">Bantuan Sosial Tunai (BST)</option>
            <option value="Subsidi Listrik">Bantuan Subsidi Listrik</option>
          </select>
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.nama_program || formEditState?.zodErrors?.nama_program} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Provinsi <span className="text-red-700">*</span>
            </span>
          </div>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="select select-bordered join-item"
            name="provinsi"
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.provinsi || formEditState?.zodErrors?.provinsi} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Kabupaten/Kota <span className="text-red-700">*</span>
            </span>
          </div>
          <select
            value={selectedRegency}
            onChange={(e) => setSelectedRegency(e.target.value)}
            disabled={!selectedProvince}
            name="kabupaten_kota"
            className="select select-bordered join-item"
          >
            <option value="">Pilih Kabupaten/Kota</option>
            {regencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.kabupaten_kota || formEditState?.zodErrors?.kabupaten_kota} />
          </div>
        </label>
        <label className={`form-control w-full max-w-full`}>
          <div className="label">
            <span className="label-text text-zinc-900">
              Kecamatan <span className="text-red-700">*</span>
            </span>
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedRegency}
            name="kecamatan"
            className="select select-bordered join-item"
          >
            <option value="">Pilih Kecamatan</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.kecamatan || formEditState?.zodErrors?.kecamatan} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Jumlah Penerima <span className="text-red-700">*</span>
            </span>
          </div>
          <input
            id="jml_penerima"
            name="jml_penerima"
            type="number"
            inputMode="numeric"
            value={formReportState.jml_penerima}
            onChange={handleInputChange}
            placeholder="2000"
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.jml_penerima || formEditState?.zodErrors?.jml_penerima} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Tanggal Penyaluran <span className="text-red-700">*</span>
            </span>
          </div>
          <input
            id="tgl_penyaluran"
            name="tgl_penyaluran"
            type="date"
            value={convertInputDate(formReportState.tgl_penyaluran)}
            onChange={handleInputChange}
            placeholder="date"
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.tgl_penyaluran || formEditState?.zodErrors?.tgl_penyaluran} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Bukti <span className="text-red-700">*</span>
            </span>
          </div>
          <input
            id="bukti"
            name="bukti"
            type="file"
            onChange={handleFileSelected}
            placeholder="bukti dalam bentuk pdf"
            className="file-input bg-white file-input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            {(formReportState.bukti || file) && (
              <Link
                href={file ? URL.createObjectURL(file) : formReportState.bukti}
                target="_blank"
                download={file?.name || formReportState.bukti}
              >
                File selected: <b>{file?.name || formReportState.bukti.split('/').pop()}</b>
              </Link>
            )}
            <ZodErrors error={formAddState?.zodErrors?.bukti || formEditState?.zodErrors?.bukti} />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Catatan</span>
          </div>
          <textarea
            id="catatan"
            name="catatan"
            value={formReportState.catatan}
            onChange={handleInputChange}
            placeholder="Masukan catatan tambahan"
            className="textarea textarea-bordered bg-white h-40 w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors error={formAddState?.zodErrors?.catatan || formEditState?.zodErrors?.catatan} />
          </div>
        </label>
        <div className="flex flex-row gap-2 justify-between mt-5">
          <Link href={"/"} className="btn btn-outline btn-warning text-white">
            Cancel
          </Link>
          <button
            type="submit"
            className={`btn btn-info text-white ${
              isLoading ? "btn-disabled" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </Suspense>
  );
}
