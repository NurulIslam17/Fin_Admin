import React, { useEffect, useState } from 'react'
import userService from '../../services/userService';
import OfficeUserAdd from '../../components/user/OfficeUserAdd';
import roleService from '../../services/roleService';
import { Edit, EyeIcon, Trash2 } from 'lucide-react';
import { useConfirm } from '../../context/ConfirmModalContext';
import toast from 'react-hot-toast';

const UserList = () => {

    const { confirm } = useConfirm();

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [roles, setRoles] = useState([]);
    const [officeUsers, setOfficeUsers] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [params, setParams] = useState({
        'page': 1,
        'per_page': 10,
        'role': "",
        'email': "",
        'emp_id': ""
    })


    const fetchRoles = async () => {
        const response = await roleService.getRoles();
        setRoles(response?.data);
    }


    const fetchOfficeUser = async (params = {}) => {

        try {
            setLoading(true);
            const response = await userService.getAllOfficeUsers(params);

            if (response?.status) {
                setPagination(response?.data);
                setOfficeUsers(response?.data?.data);
            }

        } catch (error) {
            console.log("Error Found!");
            console.error("Failed to fetch roles:", error);
        } finally {
            setLoading(false);
        }

    }

    const handleModalClose = () => {
        setAddModalOpen(false);
    }

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const deleteUser = async (id) => {
        const response = await userService.deleteUserById(id);
        if (response?.status) {
            toast.success("User Deleted Successfuly.")

            setOfficeUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== id)
            );

        } else {
            toast.error("Failed to delete the record!");
        }
    }

    const handleDelete = (id, name) => {
        confirm({
            title: "Delete User?",
            message: `Are you sure you want to delete ${name}? This action cannot be undone.`,
            onConfirm: () => deleteUser(id),
        });
    }

    useEffect(() => {
        fetchRoles();
    }, [])

    useEffect(() => {
        fetchOfficeUser(params);
    }, [params])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6 bg-gray-300 rounded-lg px-2 py-3">
                <h1 className="text-2xl font-semibold">User</h1>

                <button
                    onClick={() => { setAddModalOpen(true) }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Office User
                </button>
            </div>

            {/* Filter Section */}

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            Filter Office Users
                        </h3>
                        <p className="text-sm text-gray-500">
                            Search and filter office users.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setParams({
                                page: 1,
                                per_page: 10,
                                role: "",
                                email: "",
                                emp_id: "",
                            });
                        }}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                    >
                        Reset
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {/* Per Page */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Items Per Page
                        </label>

                        <select
                            value={params.per_page}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    per_page: Number(e.target.value),
                                    page: 1,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                        </select>
                    </div>
                    {/* Role */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <select
                            value={params.role}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    role: e.target.value,
                                    page: 1,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">All Roles</option>

                            {roles && roles.map((branch) => (
                                <option key={branch.id} value={branch?.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="text"
                            placeholder="Search by email..."
                            value={params.email}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                    page: 1,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Employee ID
                        </label>

                        <input
                            type="text"
                            placeholder="Search by employee ID..."
                            value={params.emp_id}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    emp_id: e.target.value,
                                    page: 1,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    SL
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    Name
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                                    Employee ID
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    Role
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    Branch
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    Designation
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                                    Created At
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                                    Last Update
                                </th>

                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-10 text-center text-gray-500"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : officeUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="py-10 text-center text-gray-500"
                                    >
                                        No office users found.
                                    </td>
                                </tr>
                            ) : (
                                officeUsers.map((user, index) => {
                                    const role =
                                        user?.roles?.length > 0
                                            ? user.roles
                                                .map((role) => role.name)
                                                .join(", ")
                                            : "N/A";

                                    return (
                                        <tr
                                            key={user.id}
                                            className="border-t transition hover:bg-gray-50"
                                        >
                                            {/* SL */}
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {index +
                                                    1 +
                                                    ((pagination?.current_page ||
                                                        1) -
                                                        1) *
                                                    (pagination?.per_page ||
                                                        10)}
                                            </td>

                                            {/* Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                        {user?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-gray-800">
                                                            {user?.name || "N/A"}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {user?.email || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Employee ID */}
                                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                {user?.office_user
                                                    ?.employee_id || "N/A"}
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                    {role}
                                                </span>
                                            </td>

                                            {/* Branch */}
                                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                {user?.branch?.name || "N/A"}
                                            </td>

                                            {/* Designation */}
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {user?.office_user
                                                    ?.designation || "N/A"}
                                            </td>

                                            {/* Created At */}
                                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                {formatDate(user?.created_at)}
                                            </td>

                                            {/* Updated At */}
                                            <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                {formatDate(user?.updated_at)}
                                            </td>


                                            {/* Action */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="rounded cursor-pointer bg-green-500 p-1 text-sm text-black hover:bg-green-300"
                                                    >
                                                        <EyeIcon />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(user?.id, user?.name)}
                                                        className="rounded cursor-pointer bg-red-500 p-1 text-sm text-gray-600 hover:bg-red-300 hover:text-white"
                                                    >
                                                        <Trash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!loading && pagination?.last_page > 1 && (
                <div className="flex flex-col items-center justify-between gap-4 border-t bg-white px-6 py-4 sm:flex-row">

                    {/* Showing info */}
                    <div className="text-sm text-gray-600">
                        Showing{" "}
                        <span className="font-semibold">
                            {pagination?.from || 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-semibold">
                            {pagination?.to || 0}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                            {pagination?.total || 0}
                        </span>{" "}
                        results
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-1">

                        {/* Previous */}
                        <button
                            type="button"
                            disabled={!pagination?.prev_page_url}
                            onClick={() =>
                                setParams((prev) => ({
                                    ...prev,
                                    page: prev.page - 1,
                                }))
                            }
                            className="rounded-md border px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: pagination?.last_page || 1 },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() =>
                                    setParams((prev) => ({
                                        ...prev,
                                        page: page,
                                    }))
                                }
                                className={`min-w-10 rounded-md px-3 py-2 text-sm font-medium transition ${pagination?.current_page === page
                                    ? "bg-blue-600 text-white"
                                    : "border text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            type="button"
                            disabled={!pagination?.next_page_url}
                            onClick={() =>
                                setParams((prev) => ({
                                    ...prev,
                                    page: prev.page + 1,
                                }))
                            }
                            className="rounded-md border px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            <OfficeUserAdd
                isOpen={addModalOpen} onClose={handleModalClose} roles={roles} fetchOfficeUser={fetchOfficeUser}
            />
        </div>
    )
}

export default UserList