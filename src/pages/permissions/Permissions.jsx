import React, { useEffect, useState } from "react";
import permissionService from "../../services/permissionService";

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchPermissions = async (page = 1) => {
        try {
            setLoading(true);

            const response = await permissionService.getPermissions(page);

            if (response.status) {
                // If API returns Laravel pagination
                if (response.data.data) {
                    setPermissions(response.data.data);
                    setCurrentPage(response.data.current_page);
                    setLastPage(response.data.last_page);
                } else {
                    // If API returns simple array
                    setPermissions(response.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch permissions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPermissions(currentPage);
    }, [currentPage]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6 bg-gray-300 rounded-lg px-2 py-3">
                <h1 className="text-2xl font-semibold">Permissions</h1>

                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add Permission
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="px-6 py-3 text-left">#</th>
                            <th className="px-6 py-3 text-left">Permission</th>
                            <th className="px-6 py-3 text-left">Guard</th>
                            <th className="px-6 py-3 text-left">Created At</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8">
                                    Loading...
                                </td>
                            </tr>
                        ) : permissions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-8">
                                    No permissions found.
                                </td>
                            </tr>
                        ) : (
                            permissions.map((permission, index) => (
                                <tr
                                    key={permission.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">
                                        {(currentPage - 1) * permissions.length + index + 1}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {permission.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {permission.guard_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(permission.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                                Edit
                                            </button>

                                            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {lastPage > 1 && (
                    <div className="flex justify-between items-center px-6 py-4 border-t">
                        <button
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {lastPage}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === lastPage}
                            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Permissions;