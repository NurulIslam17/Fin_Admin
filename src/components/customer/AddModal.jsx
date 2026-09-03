import React, { useState } from 'react'

const AddModal = ({ closeModal }) => {

    const [formData, setFormData] = useState({
        user_id: "",
        branch_id: "",
        customer_no: "",
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        alternate_phone: "",
        nid: "",
        passport_no: "",
        email: "",
        occupation: "",
        present_address: "",
        permanent_address: "",
        kyc_status: "PENDING",
        status: "ACTIVE",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Remove field error when user starts typing 
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call will go here 
        console.log("Customer Data:", formData);
        // Example: 
        // // axios.post("/api/customers", formData); 
    };

    const handleCloseModal = () => {
        closeModal();

    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Create Customer
                        </h2>

                        <p className="mt-0.5 text-sm text-gray-500">
                            Add a new customer to the banking system.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-lg cursor-pointer p-2 text-gray-400 transition bg-red-400 hover:bg-red-700 text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
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

                {/* Modal Body */}
                <form
                    onSubmit={handleSubmit}
                    className="overflow-y-auto"
                >
                    <div className="space-y-6 p-6">

                        {/* =========================
                                    CUSTOMER INFORMATION
                                ========================== */}

                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                Customer Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Customer No */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Customer No
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="customer_no"
                                        value={formData.customer_no}
                                        onChange={handleChange}
                                        placeholder="CUS-000001"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.customer_no && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.customer_no}
                                        </p>
                                    )}
                                </div>

                                {/* First Name */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        First Name
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="First name"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Last Name
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Last name"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Gender
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option value="">
                                            Select gender
                                        </option>
                                        <option value="MALE">
                                            Male
                                        </option>
                                        <option value="FEMALE">
                                            Female
                                        </option>
                                        <option value="OTHER">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Date of Birth
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="date"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Occupation */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Occupation
                                    </label>

                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        placeholder="e.g. Businessman"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* =========================
                                    CONTACT INFORMATION
                                ========================== */}

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                Contact Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                {/* Phone */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Phone
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="017XXXXXXXX"
                                        maxLength={20}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Alternate Phone */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Alternate Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="alternate_phone"
                                        value={formData.alternate_phone}
                                        onChange={handleChange}
                                        placeholder="018XXXXXXXX"
                                        maxLength={20}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="customer@example.com"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* NID */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        NID
                                    </label>

                                    <input
                                        type="text"
                                        name="nid"
                                        value={formData.nid}
                                        onChange={handleChange}
                                        placeholder="National ID number"
                                        maxLength={30}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Passport */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Passport No
                                    </label>

                                    <input
                                        type="text"
                                        name="passport_no"
                                        value={formData.passport_no}
                                        onChange={handleChange}
                                        placeholder="Passport number"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* =========================
                                    BRANCH INFORMATION
                                ========================== */}

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                Branch Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                {/* User */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        User
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <select
                                        name="user_id"
                                        value={formData.user_id}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select user
                                        </option>

                                        <option value="1">
                                            John Doe
                                        </option>

                                        <option value="2">
                                            Sarah Ahmed
                                        </option>
                                    </select>
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Branch
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <select
                                        name="branch_id"
                                        value={formData.branch_id}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select branch
                                        </option>

                                        <option value="1">
                                            Dhaka Main Branch
                                        </option>

                                        <option value="2">
                                            Gulshan Branch
                                        </option>

                                        <option value="3">
                                            Banani Branch
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        {/* =========================
                                    ADDRESS
                                ========================== */}

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                Address Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                {/* Present Address */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Present Address
                                        <span className="text-red-500">
                                            {" "}*
                                        </span>
                                    </label>

                                    <textarea
                                        name="present_address"
                                        value={
                                            formData.present_address
                                        }
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter present address"
                                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Permanent Address */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Permanent Address
                                    </label>

                                    <textarea
                                        name="permanent_address"
                                        value={
                                            formData.permanent_address
                                        }
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Enter permanent address"
                                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>
                        </div>


                        {/* =========================
                                    KYC & STATUS
                                ========================== */}

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                                KYC & Status
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                {/* KYC Status */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        KYC Status
                                    </label>

                                    <select
                                        name="kyc_status"
                                        value={formData.kyc_status}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="PENDING">
                                            Pending
                                        </option>

                                        <option value="UNDER_REVIEW">
                                            Under Review
                                        </option>

                                        <option value="VERIFIED">
                                            Verified
                                        </option>

                                        <option value="REJECTED">
                                            Rejected
                                        </option>

                                        <option value="EXPIRED">
                                            Expired
                                        </option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="ACTIVE">
                                            Active
                                        </option>

                                        <option value="INACTIVE">
                                            Inactive
                                        </option>

                                        <option value="BLOCKED">
                                            Blocked
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =========================
                                MODAL FOOTER
                            ========================== */}

                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="rounded-lg cursor-pointer border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg cursor-pointer bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Create Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddModal