"use client";
import Link from "next/link";
import Base from "./components/Base";
import Table from "./components/Table";
import { useEffect, useState } from "react";
import { ApiError } from "./types/ApiError";
import { ListReport } from "./types/Report";
import { reportsService } from "./data/services";
import ErrorToast from "./components/ErrorToast";

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("")
  const [reportData, setReportData] = useState<ListReport[]>([]);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const response = await reportsService.getListReport();
    if (response.data) {
      const reportResult: ListReport[] = response.data;
      setReportData(reportResult);
    } else {
      setErrorData({
        code: response.code,
        message: response.message,
      });
      setIsToastOpen(true);
    }
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Base>
        <ErrorToast
          error={errorData}
          isOpen={isToastOpen}
          onClose={handleCloseToast}
        />
        <div className="w-2/3">
          <div className="flex flex-row  justify-between mb-4">
            <label className="input input-bordered flex items-center gap-2 w-fit mb-1">
              <input type="text" className="grow" placeholder="Cari Program/Wilayah" onChange={handleSearchChange} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <Link href={"/form"}>
              <button className="btn btn-success text-white item">
                {" "}
                + Add Report
              </button>
            </Link>
          </div>
          <Table dataTable={reportData} searchValue={searchValue}/>
        </div>
      </Base>
    </>
  );
}
