import React from "react";

const OfficeUserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;

    const officeUser = user.office_user;

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const InfoItem = ({ label, value }) => (
        <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {label}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
                {value || "N/A"}
            </p>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                            {user.name
                                ?.split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {officeUser?.employee_id}
                            </p>
                        </div>
                    </div>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto p-6">

                    {/* Account Information */}
                    <section>
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 rounded-xl bg-gray-50 p-5 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Full Name"
                                value={user.name}
                            />

                            <InfoItem
                                label="Email"
                                value={user.email}
                            />

                            <InfoItem
                                label="Branch ID"
                                value={user.branch?.name}
                            />

                            <InfoItem
                                label="Employee ID"
                                value={officeUser?.employee_id}
                            />

                            <InfoItem
                                label="Account Created"
                                value={formatDate(user.created_at)}
                            />

                            <InfoItem
                                label="Last Updated"
                                value={formatDate(user.updated_at)}
                            />
                        </div>
                    </section>

                    {/* Employment Information */}
                    <section className="mt-8">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Employment Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 rounded-xl bg-gray-50 p-5 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Designation"
                                value={user?.roles?.[0]?.name}
                            />


                            <InfoItem
                                label="Employee Type"
                                value={officeUser?.employee_type}
                            />

                            <InfoItem
                                label="Employment Status"
                                value={officeUser?.employment_status}
                            />

                            <InfoItem
                                label="Joining Date"
                                value={formatDate(user.created_at)}
                            />

                            <InfoItem
                                label="Resignation Date"
                                value={formatDate(officeUser?.resignation_date)}
                            />
                        </div>
                    </section>

                    {/* Personal Information */}
                    <section className="mt-8">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 rounded-xl bg-gray-50 p-5 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="Gender"
                                value={officeUser?.gender}
                            />

                            <InfoItem
                                label="Date of Birth"
                                value={formatDate(officeUser?.date_of_birth)}
                            />

                            <InfoItem
                                label="Nationality"
                                value={officeUser?.nationality || "Bangldeshi"}
                            />

                            <InfoItem
                                label="Phone"
                                value={officeUser?.phone}
                            />

                            <InfoItem
                                label="Alternative Phone"
                                value={officeUser?.alternative_phone}
                            />

                            <InfoItem
                                label="Personal Email"
                                value={officeUser?.personal_email}
                            />

                            <InfoItem
                                label="NID"
                                value={officeUser?.nid}
                            />

                            <InfoItem
                                label="Passport Number"
                                value={officeUser?.passport_no}
                            />
                        </div>
                    </section>

                    {/* Address */}
                    <section className="mt-8">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Address Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 rounded-xl bg-gray-50 p-5 sm:grid-cols-2">
                            <InfoItem
                                label="Present Address"
                                value={officeUser?.present_address}
                            />

                            <InfoItem
                                label="Permanent Address"
                                value={officeUser?.permanent_address}
                            />
                        </div>
                    </section>

                    {/* Emergency Contact */}
                    <section className="mt-8">
                        <h3 className="mb-4 text-base font-semibold text-gray-900">
                            Emergency Contact
                        </h3>

                        <div className="grid grid-cols-1 gap-5 rounded-xl bg-gray-50 p-5 sm:grid-cols-3">
                            <InfoItem
                                label="Contact Name"
                                value={officeUser?.emergency_contact_name}
                            />

                            <InfoItem
                                label="Phone"
                                value={officeUser?.emergency_contact_phone}
                            />

                            <InfoItem
                                label="Relation"
                                value={officeUser?.emergency_contact_relation}
                            />
                        </div>
                    </section>

                    {/* Notes */}
                    {officeUser?.notes && (
                        <section className="mt-8">
                            <h3 className="mb-4 text-base font-semibold text-gray-900">
                                Notes
                            </h3>

                            <div className="rounded-xl bg-gray-50 p-5">
                                <p className="text-sm leading-6 text-gray-700">
                                    {officeUser.notes}
                                </p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfficeUserDetailsModal;