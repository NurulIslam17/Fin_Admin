import React, { useEffect, useState } from "react";
import roleService from "../../services/roleService";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const response = await roleService.getRoles();

            if (response.status) {
                setRoles(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6 bg-gray-300 rounded-lg px-2 py-3">
                <h1 className="text-2xl font-semibold">Roles</h1>

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Role
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="px-6 py-3 text-left">SL</th>
                            <th className="px-6 py-3 text-left">Role Name</th>
                            <th className="px-6 py-3 text-left">Guard</th>
                            <th className="px-6 py-3 text-left">Created At</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : roles.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500"
                                >
                                    No roles found.
                                </td>
                            </tr>
                        ) : (
                            roles.map((role, index) => (
                                <tr
                                    key={role.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>

                                    <td className="px-6 py-4 font-medium">
                                        {role.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {role.guard_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(role.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Roles;