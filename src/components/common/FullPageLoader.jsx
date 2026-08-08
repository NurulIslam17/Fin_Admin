import React from "react";

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="relative flex items-center justify-center w-28 h-28">
                {/* Circular Spinner Around Shield */}
                <div className="absolute inset-0 rounded-full border-[5px] border-blue-100 border-t-blue-600 animate-spin"></div>

                {/* Shield */}
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg">
                    <svg
                        className="w-10 h-10 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2L4 5v6c0 5.25 3.4 10.17 8 11.5 4.6-1.33 8-6.25 8-11.5V5l-8-3z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FullPageLoader;