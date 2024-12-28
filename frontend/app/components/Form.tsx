"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
          setSelectedRegency("");
          setSelectedDistrict("");
        })
        .catch((err) => console.error(err));
    }
  }, [selectedProvince]);

  // Fetch Districts when Regency changes
  useEffect(() => {
    if (selectedRegency) {
      axios
        .get<District[]>(
          `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
        )
        .then((res) => {
          setDistricts(res.data);
          setSelectedDistrict("");
        })
        .catch((err) => console.error(err));
    }
  }, [selectedRegency]);

  return (
    <form className="outline-1 outline outline-zinc-400 h-full w-2/3 py-4 px-7 rounded-md">
      <h1 className="text-center font-poppins font-semibold text-xl my-4">
        Report Form
      </h1>
      {/* {bookData && (
          <input
            type="text"
            placeholder="Type here"
            name="id"
            className="input input-bordered w-full"
            value={formBookState.id}
            onChange={handleInputChange}
            hidden
          />
        )} */}
      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text text-zinc-900">
            Nama Program <span className="text-red-700">*</span>
          </span>
        </div>
        {/* <input
            type="text"
            id="nama_program"
            name="nama_program"
            placeholder="Type here..."
            // value={formBookState.title}
            // onChange={handleInputChange}
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
        <select className="select select-bordered join-item" defaultValue={""}>
          <option value="" hidden>
            Pilih program
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.title || formEditState?.zodErrors?.title} /> */}
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
        >
          <option value="">Pilih Provinsi</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.author || formEditState?.zodErrors?.author} /> */}
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
          {/* <ZodErrors error={formAddState?.zodErrors?.author || formEditState?.zodErrors?.author} /> */}
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
          {/* <ZodErrors error={formAddState?.zodErrors?.author || formEditState?.zodErrors?.author} /> */}
        </div>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text text-zinc-900">
            Jumlah Penerima <span className="text-red-700">*</span>
          </span>
        </div>
        <input
          min={1}
          id="jml_penerima"
          name="jml_penerima"
          type="number"
          // value={formBookState.year}
          // onChange={handleInputChange}
          placeholder="2000"
          className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.year || formEditState?.zodErrors?.year} /> */}
        </div>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text text-zinc-900">
            Tanggal Penyaluran <span className="text-red-700">*</span>
          </span>
        </div>
        <input
          min={1}
          id="tgl_penyaluran"
          name="tgl_penyaluran"
          type="date"
          // value={formBookState.year}
          // onChange={handleInputChange}
          placeholder="date"
          className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.year || formEditState?.zodErrors?.year} /> */}
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
          // value={formBookState.year}
          // onChange={handleInputChange}
          placeholder="date"
          className="file-input bg-white file-input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.year || formEditState?.zodErrors?.year} /> */}
        </div>
      </label>
      <label className="form-control w-full max-w-full">
        <div className="label">
          <span className="label-text text-zinc-900">Catatan</span>
        </div>
        <textarea
          id="catatan"
          name="catatan"
          // value={formBookState.year}
          // onChange={handleInputChange}
          placeholder="Masukan catatan tambahan"
          className="textarea textarea-bordered bg-white h-40 w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="label">
          {/* <ZodErrors error={formAddState?.zodErrors?.year || formEditState?.zodErrors?.year} /> */}
        </div>
      </label>
      <div className="flex flex-row gap-2 justify-between mt-5">
        <Link href={"/"} className="btn btn-outline btn-warning text-white">
          Cancel
        </Link>
        <button type="submit" className={`btn btn-info text-white`}>
          SAVE
        </button>
      </div>
    </form>
  );
}
