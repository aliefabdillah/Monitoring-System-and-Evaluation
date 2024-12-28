import React from "react";

export default function ModalLoadingLite({ isOpen }: {isOpen: boolean}) {
  return (
    <dialog id="loading_modal" className={`modal modal-middle ${isOpen ? "modal-open": ""}`}>
      <div className="modal-box w-fit bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-400 border-t-transparent"></div>
      </div>
    </dialog>
  );
}
