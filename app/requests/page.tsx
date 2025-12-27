"use client";

import KanbanBoard from "@/components/KanbanBoard";
import Link from "next/link";

export default function RequestsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Maintenance Requests</h1>
        <div className="flex gap-4">
          <Link
            href="/requests/new"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            ➕ New Request
          </Link>
          <Link
            href="/requests/calendar"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            📅 Calendar View
          </Link>
        </div>
      </div>
      <KanbanBoard />
    </div>
  );
}

