import React, { useEffect, useState } from "react";
import branchService from "../../services/branchService";
import roleService from "../../services/roleService";
import userService from "../../services/userService";
import toast from "react-hot-toast";

const OfficeUserAdd = ({ isOpen, onClose, roles, fetchOfficeUser }) => {
    const [branches, setBranches] = useState([]);

    const [formData, setFormData] = useState({
        branch_id: "",
        role: "",
        name: "",
        email: "",
        gender: "",
        date_of_birth: "",
        phone: "",
        alternative_phone: "",
        nid: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        emergency_contact_relation: "",
    });

    const fetchBranches = async () => {
        const response = await branchService.getAllBranch({ status: "ACTIVE" });
        setBranches(response?.data);
    }

    const fetchRoles = async () => {
        const response = await roleService.getRoles();
        setRoles(response?.data);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userService.addOfficeUser(formData);
            if (res?.status) {
                fetchOfficeUser();
                toast.success("Office Users Added");
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
    };

    useEffect(() => {
        fetchBranches();
        fetchRoles();
    }, [])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Add Office User
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Enter the office user information below.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center cursor-pointer  rounded-full text-xl text-red-500 bg-red-100 transition hover:bg-red-300 hover:text-red-500"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">

                    {/* Basic Information */}
                    <div className="mb-6">
                        <h3 className="mb-4 border-b pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Branch */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Branch <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="branch_id"
                                    value={formData.branch_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select Branch</option>

                                    {branches && branches.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>



                            {/* Branch */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Role <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select Role</option>

                                    {roles && roles.map((branch) => (
                                        <option key={branch.id} value={branch?.id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            {/* Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Gender <span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Phone <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="01XXXXXXXXX"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* NID */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    NID
                                </label>

                                <input
                                    type="text"
                                    name="nid"
                                    value={formData.nid}
                                    onChange={handleChange}
                                    placeholder="Enter NID number"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                        <h3 className="mb-4 border-b pb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Emergency Contact
                        </h3>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Alternative Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Alternative Phone
                                </label>

                                <input
                                    type="text"
                                    name="alternative_phone"
                                    value={formData.alternative_phone}
                                    onChange={handleChange}
                                    placeholder="01XXXXXXXXX"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Emergency Contact Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Contact Name
                                    <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="text"
                                    name="emergency_contact_name"
                                    value={formData.emergency_contact_name}
                                    onChange={handleChange}
                                    placeholder="Enter contact name"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Emergency Contact Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Contact Phone
                                    <span className="text-red-500"> *</span>
                                </label>

                                <input
                                    type="text"
                                    name="emergency_contact_phone"
                                    value={formData.emergency_contact_phone}
                                    onChange={handleChange}
                                    placeholder="01XXXXXXXXX"
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>


                            {/* Emergency Contact Relation */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Relation
                                    <span className="text-red-500"> *</span>
                                </label>

                                <select
                                    name="emergency_contact_relation"
                                    value={formData.emergency_contact_relation}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select Relation</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Sister">Sister</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end gap-3 border-t pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-100 transition bg-red-500 hover:bg-red-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Add Office User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OfficeUserAdd;