import React from 'react';
import { Clock3, Construction } from 'lucide-react';

const UpdateCommngSoon = ({title}) => {
    return (
        <div className="flex min-h-[500px] items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                    <Construction className="h-10 w-10 text-blue-600" />
                </div>

                <h2 className="mb-3 text-2xl font-bold text-gray-800">
                    {title || "Coming soon !"}
                </h2>

                <p className="mb-6 text-gray-500">
                    This page is currently under development. We are working on it
                    and it will be updated very soon.
                </p>

                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                    <Clock3 className="h-4 w-4" />
                    Coming Soon
                </div>
            </div>
        </div>
    );
};

export default UpdateCommngSoon