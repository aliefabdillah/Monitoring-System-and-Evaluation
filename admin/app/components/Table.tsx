"use client";
import React, { useEffect, useState } from "react";
import { ListReport } from "../types/Report";
import DeleteModal from "./VerifiyModal";
import EmptyPage from "./EmptyPage";

const fetchWilayahName = async (
  id: string,
  type: "province" | "district" | "regency"
) => {
  const response = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/${type}/${id}.json`
  );

  const data = await response.json();
  return data.name;
};

export default function Table({
  dataTable,
  searchValue,
}: {
  dataTable: ListReport[];
  searchValue: string;
}) {
  const [reportId, setReportId] = useState("");
  const [dataToShow, setDataToShow] = useState<ListReport[]>([]);

  useEffect(() => {
    const fetchAllNames = async () => {
      const formattedResult: ListReport[] = await Promise.all(
        dataTable.map(async (report: ListReport) => {
          const province = await fetchWilayahName(report.provinsi, "province");
          const regency = await fetchWilayahName(
            report.kabupaten_kota,
            "regency"
          );
          const district = await fetchWilayahName(report.kecamatan, "district");

          return {
            id: report.id,
            nama_program: report.nama_program,
            jml_penerima: report.jml_penerima,
            status: report.status,
            provinsi: province,
            kabupaten_kota: regency,
            kecamatan: district,
          };
        })
      );

      setDataToShow(formattedResult);
    };

    fetchAllNames();
  }, [dataTable]);

  const dataToRender = dataToShow.filter((report) => {
    const matchesProgram = report.nama_program
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesProvince = report.provinsi
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesRegency = report.kabupaten_kota
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const matchesDistrict = report.kecamatan
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    return (
      matchesProgram || matchesProvince || matchesRegency || matchesDistrict
    );
  });

  const handleBtnDelete = (id: string) => {
    (document.getElementById("verification_modal")! as HTMLDialogElement).showModal();
    setReportId(id);
  };

  return (
    <div className="overflow-x-auto ">
      {dataToRender.length == 0 ? (
        <EmptyPage image="/empty-box.png" item="Report" size={300} />
      ) : (
        <>
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Program</th>
                <th>Penerima</th>
                <th>Wilayah</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dataToRender.map((report, index) => {
                return (
                  <tr key={index} className="font-poppins">
                    <th>{index + 1}</th>
                    <td>{report.nama_program}</td>
                    <td>{report.jml_penerima}</td>
                    <td>
                      {report.provinsi} / {report.kabupaten_kota} /{" "}
                      {report.kecamatan}
                    </td>
                    <td
                      className={`${
                        report.status == "Ditolak"
                          ? "text-error"
                          : report.status == "Disetujui"
                          ? "text-success"
                          : "text-warning"
                      } font-bold`}
                    >
                      {report.status}
                    </td>
                    <td className="flex items-center gap-4 justify-center">
                      {report.status == "Pending" && (
                        <button
                          className="text-white"
                          onClick={() => handleBtnDelete(report.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 fill-success"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <DeleteModal reportId={reportId} />
        </>
      )}
    </div>
  );
}
