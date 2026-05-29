"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Users, Shield, Building2 } from "lucide-react";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "reception",
    department: "room"
  });

  const roles = ["admin", "manager", "reception"];
  const departments = ["room", "restaurant", "general"];

  const filteredEmployees = employees.filter(employee =>
    employee.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === "" || employee.role === roleFilter) &&
    (departmentFilter === "" || employee.department === departmentFilter)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        const response = await fetch("/api/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: editingEmployee.id }),
        });
        if (response.ok) {
          const updated = await response.json();
          setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updated : emp));
        }
      } else {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const newEmployee = await response.json();
          setEmployees([...employees, newEmployee]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const resetForm = () => {
    setFormData({ username: "", password: "", role: "reception", department: "room" });
    setIsAdding(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      username: employee.username,
      password: employee.password,
      role: employee.role,
      department: employee.department
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this employee?")) {
      try {
        const response = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setEmployees(employees.filter(emp => emp.id !== id));
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "manager": return "bg-blue-100 text-blue-800";
      case "reception": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "room": return "bg-amber-100 text-amber-800";
      case "restaurant": return "bg-orange-100 text-orange-800";
      case "general": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="text-center py-12">Loading employees...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Employee Management</h1>
        <p className="mt-2 text-neutral-600">Manage reception staff and managers</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
        >
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
          ))}
        </select>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept.charAt(0).toUpperCase() + dept.slice(1)}</option>
          ))}
        </select>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Name</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Role</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Department</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Created</th>
              <th className="text-right px-6 py-4 text-sm font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#bd902f]/10 flex items-center justify-center">
                      <Users size={20} className="text-[#bd902f]" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">{employee.username}</div>
                      <div className="text-sm text-neutral-500">ID: {employee.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(employee.role)}`}>
                    {employee.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDepartmentColor(employee.department)}`}>
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {new Date(employee.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={resetForm}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Password *</label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept.charAt(0).toUpperCase() + dept.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  {editingEmployee ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
