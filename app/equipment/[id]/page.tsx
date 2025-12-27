"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";

interface Equipment {
  _id: string;
  name: string;
  serialNumber: string;
  department: string;
  location: string;
  purchaseDate: string;
  warrantyEnd: string;
  maintenanceTeam?: { _id: string; name: string };
  defaultTechnician?: { _id: string; name: string };
  isScrapped: boolean;
}

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchEquipment();
      fetchRequestCount();
    }
  }, [params.id]);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get(`/api/equipment/${params.id}`);
      setEquipment(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      setLoading(false);
    }
  };

  const fetchRequestCount = async () => {
    try {
      const res = await axios.get(`/api/requests?equipmentId=${params.id}`);
      setRequestCount(res.data.length);
    } catch (error) {
      console.error("Error fetching request count:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Equipment not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        href="/equipment"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Equipment
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-4xl font-bold mb-6">{equipment.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Serial Number</p>
            <p className="text-xl font-semibold">{equipment.serialNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Department</p>
            <p className="text-xl font-semibold">{equipment.department}</p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="text-xl font-semibold">{equipment.location}</p>
          </div>
          <div>
            <p className="text-gray-600">Purchase Date</p>
            <p className="text-xl font-semibold">
              {equipment.purchaseDate
                ? new Date(equipment.purchaseDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Warranty End</p>
            <p className="text-xl font-semibold">
              {equipment.warrantyEnd
                ? new Date(equipment.warrantyEnd).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          {equipment.maintenanceTeam && (
            <div>
              <p className="text-gray-600">Maintenance Team</p>
              <p className="text-xl font-semibold">
                {equipment.maintenanceTeam.name}
              </p>
            </div>
          )}
          {equipment.defaultTechnician && (
            <div>
              <p className="text-gray-600">Default Technician</p>
              <p className="text-xl font-semibold">
                {equipment.defaultTechnician.name}
              </p>
            </div>
          )}
          <div>
            <p className="text-gray-600">Status</p>
            <p className="text-xl font-semibold">
              {equipment.isScrapped ? (
                <span className="text-red-500">Scrapped</span>
              ) : (
                <span className="text-green-500">Active</span>
              )}
            </p>
          </div>
        </div>

        <Link
          href={`/requests?equipmentId=${equipment._id}`}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition inline-block"
        >
          View Maintenance Requests ({requestCount})
        </Link>
      </motion.div>
    </div>
  );
}

