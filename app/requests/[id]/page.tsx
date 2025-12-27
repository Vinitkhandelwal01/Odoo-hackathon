"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

interface Request {
  _id: string;
  subject: string;
  type: string;
  status: string;
  scheduledDate?: string;
  duration?: number;
  equipment?: { _id: string; name: string };
  team?: { _id: string; name: string };
  technician?: { _id: string; name: string };
}

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchRequest();
    }
  }, [params.id]);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`/api/requests/${params.id}`);
      setRequest(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching request:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (request?.status === newStatus) {
      return; // Already in this status
    }

    const confirmMessage = newStatus === "Scrap" 
      ? "Are you sure? This will mark the equipment as scrapped."
      : `Change status to ${newStatus}?`;
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await axios.patch(`/api/requests/${params.id}`, { status: newStatus });
      if (response.data) {
        fetchRequest();
        if (newStatus === "Scrap") {
          alert("Status updated to Scrap. Equipment has been marked as scrapped.");
        } else {
          alert(`Status updated to ${newStatus}`);
        }
      }
    } catch (error: any) {
      console.error("Error updating request:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to update request";
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

  if (!request) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Request not found</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Repaired":
        return "bg-green-500";
      case "Scrap":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Link
        href="/requests"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Requests
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-4xl font-bold">{request.subject}</h1>
          <span
            className={`${getStatusColor(request.status)} text-white px-4 py-2 rounded-lg font-semibold`}
          >
            {request.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Type</p>
            <p className="text-xl font-semibold">{request.type}</p>
          </div>
          {request.equipment && (
            <div>
              <p className="text-gray-600">Equipment</p>
              <Link
                href={`/equipment/${request.equipment._id}`}
                className="text-xl font-semibold text-blue-500 hover:underline"
              >
                {request.equipment.name}
              </Link>
            </div>
          )}
          {request.team && (
            <div>
              <p className="text-gray-600">Team</p>
              <p className="text-xl font-semibold">{request.team.name}</p>
            </div>
          )}
          {request.technician && (
            <div>
              <p className="text-gray-600">Technician</p>
              <p className="text-xl font-semibold">
                {request.technician.name}
              </p>
            </div>
          )}
          {request.scheduledDate && (
            <div>
              <p className="text-gray-600">Scheduled Date</p>
              <p className="text-xl font-semibold">
                {new Date(request.scheduledDate).toLocaleDateString()}
              </p>
            </div>
          )}
          {request.duration && (
            <div>
              <p className="text-gray-600">Duration (hours)</p>
              <p className="text-xl font-semibold">{request.duration}</p>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-xl font-bold mb-4">Change Status</h3>
          <div className="flex gap-2 flex-wrap">
            {["New", "In Progress", "Repaired", "Scrap"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 rounded transition font-semibold ${
                  request.status === status
                    ? getStatusColor(status) + " text-white cursor-default"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                disabled={request.status === status}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

