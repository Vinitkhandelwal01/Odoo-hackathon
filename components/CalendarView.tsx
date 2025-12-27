"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CalendarEvent {
  title: string;
  date: string;
  id: string;
  backgroundColor?: string;
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPreventiveRequests();
  }, []);

  const fetchPreventiveRequests = async () => {
    try {
      const res = await axios.get("/api/requests?type=Preventive");
      const calendarEvents: CalendarEvent[] = res.data.map((request: any) => ({
        title: request.subject,
        date: request.scheduledDate || new Date().toISOString(),
        id: request._id,
        backgroundColor: "#3b82f6",
      }));
      setEvents(calendarEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching preventive requests:", error);
      setLoading(false);
    }
  };

  const handleDateClick = (info: any) => {
    router.push(`/requests/new?date=${info.dateStr}`);
  };

  const handleEventClick = (info: any) => {
    router.push(`/requests/${info.event.id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div>Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        height="auto"
      />
    </div>
  );
}

