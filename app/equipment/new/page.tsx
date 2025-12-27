"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EquipmentForm from "@/components/EquipmentForm";

export default function NewEquipmentPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    if (!data.name || !data.serialNumber || !data.department || !data.location) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post("/api/equipment", data);
      if (response.data) {
        router.push("/equipment");
      }
    } catch (error: any) {
      console.error("Error creating equipment:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to create equipment";
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Add New Equipment</h1>
      <EquipmentForm onSubmit={handleSubmit} />
    </div>
  );
}

