import React, { useEffect, useState } from 'react'
import userService from '../../services/userService';

const UserList = () => {

    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [officeUsers, setOfficeUsers] = useState([]);

    const fetchOfficeUser = async () => {

        try {
            setLoading(true);
            const response = await userService.getAllOfficeUsers();

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

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    useEffect(() => {
        fetchOfficeUser();
    }, [])

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6 bg-gray-300 rounded-lg px-2 py-3">
                <h1 className="text-2xl font-semibold">User</h1>

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Office User
                </button>
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

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
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

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                    Created At
                                </th>

                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
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
                                            <td className="px-6 py-4 text-sm text-gray-700">
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
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {user?.branch?.name || "N/A"}
                                            </td>

                                            {/* Designation */}
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {user?.office_user
                                                    ?.designation || "N/A"}
                                            </td>

                                            {/* Created At */}
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {formatDate(user?.created_at)}
                                            </td>

                                            {/* Updated At */}
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {formatDate(user?.updated_at)}
                                            </td>


                                            {/* Action */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
                                                    >
                                                        Delete
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

            {/* Pagination info */}
            {!loading && officeUsers.length > 0 && (
                <div className="flex items-center justify-between border-t px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-medium text-gray-700">
                            {pagination?.from || 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium text-gray-700">
                            {pagination?.to || 0}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-700">
                            {pagination?.total || 0}
                        </span>{" "}
                        users
                    </p>
                </div>
            )}
        </div>
    )
}

export default UserList