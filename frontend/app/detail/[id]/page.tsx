import Base from "@/app/components/Base";
import Link from "next/link";
import React from "react";

export default function DetailPage() {
  return (
    <Base>
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
        <div className="p-6 mt-8 w-full flex flex-col gap-3 outline rounded-xl outline-2 outline-gray-300">
          <div className="flex flex-row justify-between">
            <p className="font-bold text-2xl">Nama Program</p>
            <p className="font-bold text-lg mr-4">Status</p>
          </div>
          <div className="text-xl flex flex-row items-start gap-2">
            <li className="w-1/3 md:h-1/4">Penerima</li>
            <p className="w-fit md:text-start text-end">:</p>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:h-1/4">Wilayah</li>
            <p className="w-fit md:text-start text-end">:</p>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:h-1/4">Tanggal Penyaluran</li>
            <p className="w-fit md:text-start text-end">:</p>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:h-1/4">Bukti Penyaluran</li>
            <p className="w-fit md:text-start text-end">:</p>
          </div>
          <div className="text-xl flex flex-row items-center gap-2">
            <li className="w-1/3 md:h-1/4">Catatan</li>
            <p className="w-fit md:text-start text-end">:</p>
          </div>
        </div>
      </div>
    </Base>
  );
}
