"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface EquipmentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function EquipmentForm({
  onSubmit,
  initialData,
}: EquipmentFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    serialNumber: initialData?.serialNumber || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    purchaseDate: initialData?.purchaseDate
      ? new Date(initialData.purchaseDate).toISOString().split("T")[0]
      : "",
    warrantyEnd: initialData?.warrantyEnd
      ? new Date(initialData.warrantyEnd).toISOString().split("T")[0]
      : "",
    maintenanceTeam: initialData?.maintenanceTeam?._id || "",
    defaultTechnician: initialData?.defaultTechnician?._id || "",
  });

  const [teams, setTeams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeams();
    fetchUsers();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoadingTeams(true);
      const res = await axios.get("/api/teams");
      setTeams(res.data || []);
      if (!res.data || res.data.length === 0) {
        setError("No teams found. Please create teams first from the Teams page.");
      }
      setLoadingTeams(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setError("Failed to load teams. Please check your connection.");
      setLoadingTeams(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await axios.get("/api/users");
      setUsers(res.data || []);
      if (!res.data || res.data.length === 0) {
        setError("No users found. Please create users first.");
      }
      setLoadingUsers(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please check your connection.");
      setLoadingUsers(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Serial Number *
          </label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Department *
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Purchase Date
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Warranty End
          </label>
          <input
            type="date"
            name="warrantyEnd"
            value={formData.warrantyEnd}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Maintenance Team
          </label>
          <select
            name="maintenanceTeam"
            value={formData.maintenanceTeam}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            disabled={loadingTeams}
          >
            <option value="" className="text-black">Select Team</option>
            {loadingTeams ? (
              <option value="" disabled className="text-black">Loading teams...</option>
            ) : teams.length === 0 ? (
              <option value="" disabled className="text-black">No teams available - Create teams first</option>
            ) : (
              teams.map((team) => (
                <option key={team._id} value={team._id} className="text-black">
                  {team.name}
                </option>
              ))
            )}
          </select>
          {teams.length === 0 && !loadingTeams && (
            <p className="text-sm text-red-500 mt-1">
              <a href="/teams" className="underline">Create teams first</a>
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Default Technician
          </label>
          <select
            name="defaultTechnician"
            value={formData.defaultTechnician}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            disabled={loadingUsers}
          >
            <option value="" className="text-black">Select Technician</option>
            {loadingUsers ? (
              <option value="" disabled className="text-black">Loading users...</option>
            ) : users.length === 0 ? (
              <option value="" disabled className="text-black">No users available - Create users first</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user._id} className="text-black">
                  {user.name}
                </option>
              ))
            )}
          </select>
          {users.length === 0 && !loadingUsers && (
            <p className="text-sm text-red-500 mt-1">
              <a href="/users" className="underline">Create users first</a>
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          {error}
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition font-semibold"
        >
          {initialData ? "Update Equipment" : "Create Equipment"}
        </button>
        {!initialData && (
          <a
            href="/teams"
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition font-semibold inline-block"
          >
            Create Teams First
          </a>
        )}
      </div>
    </form>
  );
}

