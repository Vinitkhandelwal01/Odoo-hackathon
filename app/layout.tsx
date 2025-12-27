import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gear Guard - Equipment Maintenance Management",
  description: "Manage equipment maintenance requests and teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              🛡️ Gear Guard
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Dashboard
              </Link>
              <Link
                href="/equipment"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Equipment
              </Link>
              <Link
                href="/teams"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Teams
              </Link>
              <Link
                href="/users"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Users
              </Link>
              <Link
                href="/requests"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Requests
              </Link>
              <Link
                href="/requests/calendar"
                className="hover:bg-blue-700 px-4 py-2 rounded transition"
              >
                Calendar
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}

