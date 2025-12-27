"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function NewRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultDate = searchParams.get("date") || "";

  const [formData, setFormData] = useState({
    subject: "",
    equipmentId: "",
    type: "Corrective",
    scheduledDate: defaultDate,
    duration: "",
  });

  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("/api/equipment");
      setEquipment(res.data.filter((eq: any) => !eq.isScrapped));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.equipmentId) {
      alert("Please select an equipment");
      return;
    }

    if (!formData.subject.trim()) {
      alert("Please enter a subject");
      return;
    }

    try {
      const response = await axios.post("/api/requests", {
        subject: formData.subject,
        equipmentId: formData.equipmentId,
        type: formData.type,
        scheduledDate: formData.scheduledDate || undefined,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
      });
      
      if (response.data) {
        router.push("/requests");
      }
    } catch (error: any) {
      console.error("Error creating request:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to create request";
      alert(`Error: ${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Create Maintenance Request</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-2xl"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Equipment *
          </label>
          <select
            name="equipmentId"
            value={formData.equipmentId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
            disabled={loading}
          >
            <option value="" className="text-black">Select Equipment</option>
            {loading ? (
              <option value="" disabled className="text-black">Loading equipment...</option>
            ) : equipment.length === 0 ? (
              <option value="" disabled className="text-black">No equipment available - Create equipment first</option>
            ) : (
              equipment.map((eq) => (
                <option key={eq._id} value={eq._id} className="text-black">
                  {eq.name} - {eq.serialNumber}
                </option>
              ))
            )}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Team and Technician will be auto-filled based on equipment
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            required
          >
            <option value="Corrective" className="text-black">Corrective</option>
            <option value="Preventive" className="text-black">Preventive</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Scheduled Date
          </label>
          <input
            type="date"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Duration (hours)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>

        {equipment.length === 0 && !loading && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            No equipment available. Please <a href="/equipment/new" className="underline font-semibold">create equipment first</a>.
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading || equipment.length === 0}
          >
            {loading ? "Creating..." : "Create Request"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/requests")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

