import React, { useEffect } from "react";
import { ApiError } from "../types/ApiError";

export default function ErrorToast({
  error,
  isOpen,
  onClose,
}: {
  error: ApiError;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isOpen) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 10000); // 10 detik
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Membersihkan timeout jika komponen di-unmount sebelum timeout tercapai
      }
    };
  }, [isOpen, onClose]);

  if (!error.message) return null;
  return (
    <>
      {isOpen && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span className="text-white font-lexend_deca">{`${error.code} : ${error.message}`}</span>
          </div>
        </div>
      )}
    </>
  );
}
