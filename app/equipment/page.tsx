"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";

interface Equipment {
  _id: string;
  name: string;
  serialNumber: string;
  department: string;
  location: string;
  purchaseDate: string;
  warrantyEnd: string;
  maintenanceTeam?: { name: string };
  defaultTechnician?: { name: string };
  isScrapped: boolean;
}

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("/api/equipment");
      setEquipment(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching equipment:", error);
      setLoading(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Equipment</h1>
        <Link
          href="/equipment/new"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          ➕ Add Equipment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item, index) => (
          <EquipmentCard key={item._id} equipment={item} index={index} />
        ))}
      </div>

      {equipment.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No equipment found. Add your first equipment!
        </div>
      )}
    </div>
  );
}

function EquipmentCard({
  equipment,
  index,
}: {
  equipment: Equipment;
  index: number;
}) {
  const [requestCount, setRequestCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getRequestCount(equipment._id);
      setRequestCount(count);
    };
    fetchCount();
  }, [equipment._id]);

  const getRequestCount = async (equipmentId: string) => {
    try {
      const res = await axios.get(`/api/requests?equipmentId=${equipmentId}`);
      return res.data.length;
    } catch (error) {
      return 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
    >
      <div>
        <Link href={`/equipment/${equipment._id}`} className="block">
          <h3 className="text-xl font-bold mb-2">{equipment.name}</h3>
          <p className="text-gray-600 mb-2">Serial: {equipment.serialNumber}</p>
          <p className="text-gray-600 mb-2">Dept: {equipment.department}</p>
          <p className="text-gray-600 mb-2">Location: {equipment.location}</p>
          {equipment.maintenanceTeam && (
            <p className="text-gray-600 mb-2">
              Team: {equipment.maintenanceTeam.name}
            </p>
          )}
          {equipment.defaultTechnician && (
            <p className="text-gray-600 mb-2">
              Technician: {equipment.defaultTechnician.name}
            </p>
          )}
        </Link>
        {requestCount !== null && (
          <Link
            href={`/requests?equipmentId=${equipment._id}`}
            className="inline-block mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition font-semibold"
          >
            Maintenance ({requestCount})
          </Link>
        )}
      </div>
    </motion.div>
  );
}

