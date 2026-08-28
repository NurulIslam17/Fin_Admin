import { createContext, useContext, useState } from "react";

const ConfirmModalContext = createContext();

export const useConfirm = () => {
    return useContext(ConfirmModalContext);
};

export const ConfirmModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null,
    });

    const confirm = ({
        title = "Delete Record?",
        message = "Are you sure you want to delete this record?",
        onConfirm,
    }) => {
        setModal({
            isOpen: true,
            title,
            message,
            onConfirm,
        });
    };

    const closeModal = () => {
        setModal({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: null,
        });
    };

    const handleConfirm = async () => {
        if (modal.onConfirm) {
            await modal.onConfirm();
        }

        closeModal();
    };

    return (
        <ConfirmModalContext.Provider value={{ confirm }}>
            {children}

            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-gray-900">
                            {modal.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {modal.message}
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={closeModal}
                                className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleConfirm}
                                className="rounded-lg cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </ConfirmModalContext.Provider>
    );
};