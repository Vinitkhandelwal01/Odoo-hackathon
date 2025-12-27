"use client";

import CalendarView from "@/components/CalendarView";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Maintenance Calendar</h1>
        <Link
          href="/requests"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          ← Back to Kanban
        </Link>
      </div>
      <p className="text-gray-600 mb-4">
        Showing Preventive maintenance requests only
      </p>
      <CalendarView />
    </div>
  );
}

