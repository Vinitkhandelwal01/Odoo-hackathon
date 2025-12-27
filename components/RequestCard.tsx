"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface RequestCardProps {
  request: {
    _id: string;
    subject: string;
    type: string;
    status: string;
    scheduledDate?: string;
    equipment?: { name: string };
    team?: { name: string };
    technician?: { name: string };
  };
}

export default function RequestCard({ request }: RequestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Repaired":
        return "bg-green-100 text-green-800";
      case "Scrap":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Preventive"
      ? "bg-purple-100 text-purple-800"
      : "bg-orange-100 text-orange-800";
  };

  return (
    <Link href={`/requests/${request._id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-4 rounded-lg shadow-md mb-3 cursor-pointer hover:shadow-lg transition"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{request.subject}</h3>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
              request.status
            )}`}
          >
            {request.status}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          {request.equipment && (
            <p>
              <span className="font-semibold">Equipment:</span>{" "}
              {request.equipment.name}
            </p>
          )}
          {request.team && (
            <p>
              <span className="font-semibold">Team:</span> {request.team.name}
            </p>
          )}
          {request.technician && (
            <p>
              <span className="font-semibold">Technician:</span>{" "}
              {request.technician.name}
            </p>
          )}
          {request.scheduledDate && (
            <p>
              <span className="font-semibold">Scheduled:</span>{" "}
              {new Date(request.scheduledDate).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="mt-2">
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(
              request.type
            )}`}
          >
            {request.type}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

