"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

type ModalProps = {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function Modal({ title, message, isOpen, onClose, onConfirm }: ModalProps) {
  // Trap focus inside the modal and close on Escape key
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="modal-box bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="py-4 text-gray-600">{message}</p>
        <div className="modal-action flex justify-end gap-4">
          {/* Cancel Button */}
          <Button label="Cancel" styleType="secondary" onClick={onClose} />
          {/* Confirm Button */}
          {onConfirm && <Button label="Confirm" styleType="primary" onClick={onConfirm} />}
        </div>
      </div>
    </div>
  );
}
