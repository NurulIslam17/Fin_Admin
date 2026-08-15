import React, { useEffect, useState } from "react";
import roleService from "../../services/roleService";
import permissionService from "../../services/permissionService";
import toast from "react-hot-toast";

const ManageRoles = () => {


  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [permissionList, setPermissionList] = useState([]);

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

  const getPermissionsByRole = async (role_name) => {
    try {
      const response = await permissionService.getPermissionsByRole(role_name)
      if (response.status) {
        setPermissionList(response?.data);
      }
    } catch (error) {
      console.log("Failed to fetched permissions");
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      getPermissionsByRole(selectedRole);
    }
  }, [selectedRole])


  const modules = [
    "Dashboard",
    "User",
    "Account Type",
    "Account",
    "Customer",
    "Branch",
    "Loan",
    "Transaction",
    "Card",
    "Report",
    "Audit",
    "Role",
    "Permission",
    "Manage Role",
    "Setting"
  ];

  const permissionColumns = [
    "View",
    "Create",
    "Update",
    "Delete",
    "Approve",
    "Assign",
    "Issue",
    "Export",
    "Block",
    "Replace",
    "Close",
    "Reject",
  ];

  // |====================================================== Handle Permission Chaange  ==================================================================================|
  // |                                                                                                                                                                    |
  // |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  const getPermissionKey = (module, permission) => {
    return `${module.toLowerCase().replace(/\s+/g, "_")}.${permission.toLowerCase()}`;
  };

  const handlePermissionChange = (module, permission) => {
    const key = getPermissionKey(module, permission);

    setPermissionList((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  // |==================================================   Select all module permissions in row  =========================================================================|
  // |                                                                                                                                                                    |
  // |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  const handleModuleSelectAll = (module) => {
    const permissionKeys = permissionColumns.map((permission) =>
      getPermissionKey(module, permission)
    );
    setPermissionList((prev) => [
      ...new Set([...prev, ...permissionKeys]),
    ]);
  };

  // |==================================================   Select all all permission   ===================================================================================|
  // |                                                                                                                                                                    |
  // |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|

  const handleGlobalSelectAll = () => {
    const allPermissionKeys = modules.flatMap((module) =>
      permissionColumns.map((permission) =>
        getPermissionKey(module, permission)
      )
    );
    setPermissionList((prev) => [
      ...new Set([...prev, ...allPermissionKeys]),
    ]);
  };
  // |==================================================   Submit Data  ==================================================================================================|
  // |                                                                                                                                                                    |
  // |--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  const handleSubmit = async () => {
    const payload = {
      role: selectedRole,
      permissions: permissionList,
    };
    try {
      const response = await permissionService.permissionSync(payload);
      if (response?.status) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error("Unauthorized");
    }

  };

  return (
    <div className="">

      {/* Header */}

      <div >

        <div className="px-5">
          <div className="p-5 bg-gray-300 rounded-lg px-2 py-3">
            <h2 className="text-2xl font-bold">
              Assign Role Permissions
            </h2>
            <p className="text-gray-500 mt-1">
              Select a role and assign permissions.
            </p>
          </div>
        </div>



        {/* Role */}

        <div className="px-5 mt-1">

          <label className="block font-medium mb-2">
            Select Role
          </label>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose Role</option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.name}
              >
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Permission Table */}

        <div className="overflow-auto p-5">

          <table className="min-w-full border border-gray-400">

            <thead className="bg-gray-400">

              <tr>

                <th className="border p-3 text-left">
                  Module
                </th>

                {permissionColumns.map((column) => (
                  <th
                    key={column}
                    className="border p-3 text-center"
                  >
                    {column}
                  </th>
                ))}

                <th className="border p-3 text-center">
                  All
                </th>

              </tr>

            </thead>

            <tbody>

              {modules.map((module) => (

                <tr key={module} className="hover:bg-gray-50">

                  <td className="border p-3 font-medium">
                    {module}
                  </td>

                  {permissionColumns.map((permission) => (

                    <td
                      key={permission}
                      className="border text-center"
                    >
                      <input
                        type="checkbox"
                        checked={permissionList.includes(getPermissionKey(module, permission))}
                        onChange={() => handlePermissionChange(module, permission)}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>

                  ))}

                  <td className="border text-center">

                    <button
                      onClick={() =>
                        handleModuleSelectAll(module)
                      }
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Select
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex justify-between items-center p-5">

          <button
            onClick={handleGlobalSelectAll}
            className="px-5 py-2 bg-gray-700 text-white hover:bg-gray-800"
          >
            Select All Permissions
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedRole}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50"
          >
            Save Permissions
          </button>

        </div>

      </div>

    </div>
  );
};

export default ManageRoles;