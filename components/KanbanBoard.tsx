"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import RequestCard from "./RequestCard";
import { motion } from "framer-motion";

interface Request {
  _id: string;
  subject: string;
  type: string;
  status: string;
  scheduledDate?: string;
  equipment?: { name: string };
  team?: { name: string };
  technician?: { name: string };
}

export default function KanbanBoard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const columns = ["New", "In Progress", "Repaired", "Scrap"];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/requests");
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    try {
      await axios.patch(`/api/requests/${draggableId}`, {
        status: newStatus,
      });

      setRequests((prev) =>
        prev.map((req) =>
          req._id === draggableId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update request status");
    }
  };

  const getRequestsByStatus = (status: string) => {
    return requests.filter((req) => req.status === status);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column} className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              {column} ({getRequestsByStatus(column).length})
            </h2>
            <Droppable droppableId={column}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-gray-200" : ""
                  } rounded-lg p-2 transition`}
                >
                  {getRequestsByStatus(column).map((request, index) => (
                    <Draggable
                      key={request._id}
                      draggableId={request._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1,
                          }}
                        >
                          <RequestCard request={request} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

