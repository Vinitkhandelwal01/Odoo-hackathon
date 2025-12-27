"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({
    equipment: 0,
    teams: 0,
    requests: 0,
    activeRequests: 0,
  });
  const [setupLoading, setSetupLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [equipmentRes, teamsRes, requestsRes] = await Promise.all([
          axios.get("/api/equipment"),
          axios.get("/api/teams"),
          axios.get("/api/requests"),
        ]);

        const activeRequests = requestsRes.data.filter(
          (r: any) => r.status === "New" || r.status === "In Progress"
        ).length;

        setStats({
          equipment: equipmentRes.data.length,
          teams: teamsRes.data.length,
          requests: requestsRes.data.length,
          activeRequests,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleSetup = async () => {
    if (!confirm("This will create sample teams and users. Continue?")) {
      return;
    }

    setSetupLoading(true);
    try {
      const response = await axios.post("/api/setup");
      if (response.data) {
        alert("Setup completed! Sample teams and users have been created.");
        fetchStats();
      }
    } catch (error: any) {
      console.error("Error setting up:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to setup";
      alert(`Error: ${errorMessage}`);
    } finally {
      setSetupLoading(false);
    }
  };

  const statCards = [
    { label: "Total Equipment", value: stats.equipment, color: "bg-blue-500", link: "/equipment" },
    { label: "Maintenance Teams", value: stats.teams, color: "bg-green-500", link: "/teams" },
    { label: "Total Requests", value: stats.requests, color: "bg-yellow-500", link: "/requests" },
    { label: "Active Requests", value: stats.activeRequests, color: "bg-red-500", link: "/requests" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${card.color} text-white p-6 rounded-lg shadow-lg cursor-pointer`}
            >
              <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
              <p className="text-4xl font-bold">{card.value}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/equipment/new"
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-center font-semibold"
            >
              ➕ Add New Equipment
            </Link>
            <Link
              href="/requests/new"
              className="block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition text-center font-semibold"
            >
              ➕ Create Request
            </Link>
            <Link
              href="/requests"
              className="block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-center font-semibold"
            >
              📋 View Requests
            </Link>
            <Link
              href="/requests/calendar"
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition text-center font-semibold"
            >
              📅 View Calendar
            </Link>
            <Link
              href="/teams"
              className="block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition text-center font-semibold"
            >
              👥 Manage Teams
            </Link>
            <Link
              href="/users"
              className="block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition text-center font-semibold"
            >
              👤 Manage Users
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">System Overview</h2>
          <p className="text-gray-600 mb-4">
            Welcome to Gear Guard! Manage your equipment maintenance requests,
            teams, and schedules all in one place.
          </p>
          <div className="mt-4 space-y-3">
            <a
              href="/api/health"
              target="_blank"
              className="block bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition"
            >
              <p className="text-blue-800 font-semibold text-sm">🔍 Test MongoDB Connection</p>
              <p className="text-blue-600 text-xs">Click to check if database is connected</p>
            </a>
            
            {(stats.teams === 0 || stats.equipment === 0) && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 mb-2 font-semibold">Quick Setup</p>
                <p className="text-yellow-700 text-sm mb-3">
                  Create sample teams and users to get started quickly.
                </p>
                <button
                  onClick={handleSetup}
                  disabled={setupLoading}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {setupLoading ? "Setting up..." : "🚀 Initialize Sample Data"}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

