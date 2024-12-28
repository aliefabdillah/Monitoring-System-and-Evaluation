import { useEffect, useState } from "react";
import { ApiError } from "../types/ApiError";
import { reportsService } from "../data/services";
import ErrorToast from "./ErrorToast";
import SuccessModal from "./SuccessModal";
import ModalLoadingLite from "./ModalLoading";
import ZodErrors from "./ZodErrors";

export default function VerifiyModal({ reportId }: { reportId: string }) {
  const [verifyData, setVerifyData] = useState({
    status: "Disetujui",
    alasan: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [errorInput, setErrorInput] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (verifyData.status == "Ditolak" && verifyData.alasan.length < 1) {
      const errorData: string[] = [];
      errorData.push("Field Alasan can't be empty");
      setErrorInput(errorData);
    } else {
      (
        document.getElementById("verification_modal") as HTMLDialogElement
      ).close();
      setIsLoading(true);
      const response = await reportsService.verifyReport(reportId, {
        alasan: verifyData.alasan,
        status: verifyData.status
      });
      if (response.statusCode !== 200) {
        setErrorData({
          code: response.code,
          message: response.message,
        });
        setIsToastOpen(true);
      } else {
        setIsSuccess(true);
      }
    }

    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVerifyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelButton = (e: React.FormEvent<HTMLButtonElement>) => {
    (
      document.getElementById("verification_modal") as HTMLDialogElement
    ).close();
    e.preventDefault();
    setVerifyData({
      status: "Disetujui",
      alasan: "",
    });
  };

  return (
    <>
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <SuccessModal message="Verifikasi Laporan Sukses!" />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="verification_modal" className="modal">
        <div className="modal-box w-full">
          <form>
            <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
              Verifikasi Item
            </h1>
            <label className="form-control w-full max-w-full">
              <div className="label">
                <span className="label-text text-zinc-900">
                  Status Laporan <span className="text-red-700">*</span>
                </span>
              </div>
              <div className="flex justify-between w-3/4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="Disetujui"
                    checked={verifyData.status === "Disetujui"}
                    onChange={handleInputChange}
                    name="status"
                  />
                  <span className="label-text font-bold">Disetujui</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="Ditolak"
                    checked={verifyData.status === "Ditolak"}
                    onChange={handleInputChange}
                    name="status"
                  />
                  <span className="label-text font-bold">Ditolak</span>
                </label>
              </div>
            </label>
            {verifyData.status == "Ditolak" && (
              <label className="form-control w-full max-w-full mt-3">
                <div className="label">
                  <span className="label-text text-zinc-900">
                    Alasan <span className="text-red-700">*</span>
                  </span>
                </div>
                <textarea
                  id="alasan"
                  name="alasan"
                  value={verifyData.alasan}
                  onChange={handleInputChange}
                  placeholder="Masukan alasan penolakan..."
                  className="textarea textarea-bordered bg-white h-40 w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="label">
                  <ZodErrors error={errorInput} />
                </div>
              </label>
            )}

            <p className="mt-3 text-start">
              Apakah Anda yakin untuk memverifikasi laporan ini?
            </p>
            <div className="card-actions justify-end mt-6">
              <button
                onClick={handleCancelButton}
                className="btn btn-outline btn-warning"
              >
                Batal
              </button>
              <button
                type="submit"
                onClick={handleSave}
                className="btn btn-success text-white"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
