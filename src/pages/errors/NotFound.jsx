import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
            <div className="max-w-lg text-center">

                {/* Error Code */}
                <h1 className="text-8xl font-extrabold text-blue-600">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-3 text-gray-600">
                    Sorry, the page you're looking for doesn't exist or may have
                    been moved.
                </p>

                {/* Illustration */}
                <div className="my-10">
                    <img
                        src="https://undraw.co/api/illustrations/404.svg"
                        alt="404 Illustration"
                        className="mx-auto max-w-xs"
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row">

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Dashboard
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Go Back
                    </button>

                </div>

            </div>
        </div>
    );
};

export default NotFound;