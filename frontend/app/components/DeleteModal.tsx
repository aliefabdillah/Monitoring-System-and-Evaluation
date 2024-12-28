import { useEffect, useState } from "react";
import { ApiError } from "../types/ApiError";
import { reportsService } from "../data/services";
import ErrorToast from "./ErrorToast";
import SuccessModal from "./SuccessModal";
import ModalLoadingLite from "./ModalLoading";

export default function DeleteModal({ deletedId }: { deletedId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

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

  const handleDelete = async () => {
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
    setIsLoading(true);

    const response = await reportsService.deleteReport(deletedId);
    if (response.statusCode !== 200) {
      setErrorData({
        code: response.code,
        message: response.message,
      });
      setIsToastOpen(true);
    } else {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <SuccessModal message="Hapus Data Sukses!" />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-fit">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
            Hapus Item
          </h1>
          <p className="mb-4 text-center">
            Are you sure to delete{" "}
            <span className="font-bold">{deletedId}</span>?
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">Batal</button>
            </form>
            <button
              onClick={() => handleDelete()}
              className="btn btn-error text-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
