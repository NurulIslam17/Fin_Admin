import React, { useEffect, useMemo, useState } from "react";
import AddModal from "../../components/customer/AddModal";
import customerService from "../../services/customerService";

const CustomerList = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [kycFilter, setKycFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customers, setCustomers] = useState([]);

    const perPage = 10;
    const [showCreateModal, setShowCreateModal] = useState(false);

    const getAllCustomer = async () => {
        const res = await customerService.getAll();
        setCustomers(res?.data);
    }

    const getKycBadge = (status) => {
        const styles = {
            PENDING: "bg-yellow-100 text-yellow-700",
            UNDER_REVIEW: "bg-blue-100 text-blue-700",
            VERIFIED: "bg-green-100 text-green-700",
            REJECTED: "bg-red-100 text-red-700",
            EXPIRED: "bg-gray-100 text-gray-700",
        };

        return styles[status] || "bg-gray-100 text-gray-700";
    };

    const getStatusBadge = (status) => {
        const styles = {
            ACTIVE: "bg-green-100 text-green-700",
            INACTIVE: "bg-gray-100 text-gray-700",
            BLOCKED: "bg-red-100 text-red-700",
        };

        return styles[status] || "bg-gray-100 text-gray-700";
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
    const closeModal = () => {
        setShowCreateModal(false);
    };

    useEffect(() => {
        getAllCustomer();
    }, [])

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Customer List
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and view all registered customers.
                    </p>
                </div>

                <button onClick={() => setShowCreateModal(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                    + Add Customer
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {/* Search and Filters */}
                <div className="border-b border-gray-200 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search by customer no, name, phone or email..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* KYC Filter */}
                        <div>
                            <select
                                value={kycFilter}
                                onChange={(e) => {
                                    setKycFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">All KYC Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="UNDER_REVIEW">
                                    Under Review
                                </option>
                                <option value="VERIFIED">Verified</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="EXPIRED">Expired</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="BLOCKED">Blocked</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    SL
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Customer
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Customer No
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Contact
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Branch
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    KYC
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Created
                                </th>

                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 bg-white">
                            {customers && customers.length > 0 ? (
                                customers && customers.map((customer, index) => (


                                    <tr
                                        key={customer.id}
                                        className="transition hover:bg-gray-50"
                                    >

                                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                                            {index + 1}
                                        </td>
                                        {/* Customer */}
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                                                    {customer.first_name?.[0]}
                                                    {customer.last_name?.[0]}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {customer.first_name}{" "}
                                                        {customer.last_name}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {customer.gender}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Customer No */}
                                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                                            {customer.customer_no}
                                        </td>

                                        {/* Contact */}
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <p className="text-sm text-gray-700">
                                                {customer.phone}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {customer.email || "-"}
                                            </p>
                                        </td>

                                        {/* Branch */}
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {customer.branch?.name || "-"}
                                        </td>

                                        {/* KYC */}
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getKycBadge(
                                                    customer.kyc_status
                                                )}`}
                                            >
                                                {customer.kyc_status.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                                                    customer.status
                                                )}`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td>

                                        {/* Created */}
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
                                            {formatDate(customer.created_at)}
                                        </td>

                                        {/* Actions */}
                                        <td className="whitespace-nowrap px-4 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                                                    View
                                                </button>

                                                <button className="rounded-md border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50">
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-4 py-12 text-center"
                                    >
                                        <p className="text-sm font-medium text-gray-600">
                                            No customers found
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            Try changing your search or filters.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {/* <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-gray-500">
                        Showing{" "}
                        <span className="font-medium text-gray-700">
                            {filteredCustomers.length === 0
                                ? 0
                                : (currentPage - 1) * perPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium text-gray-700">
                            {Math.min(
                                currentPage * perPage,
                                filteredCustomers.length
                            )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-gray-700">
                            {filteredCustomers.length}
                        </span>{" "}
                        customers
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.max(prev - 1, 1)
                                )
                            }
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`h-9 w-9 rounded-md text-sm ${currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={
                                currentPage === totalPages ||
                                totalPages === 0
                            }
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div> */}
            </div>

            {showCreateModal && <AddModal closeModal={closeModal} getAllCustomer={getAllCustomer} />}
        </div>
    );
};

export default CustomerList;