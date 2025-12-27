import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    // Check if MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          status: "error",
          message: "MONGODB_URI not found in environment variables",
          instructions: "Please create .env.local file with MONGODB_URI",
        },
        { status: 500 }
      );
    }

    // Try to connect
    await connectDB();

    // Check connection state
    const state = mongoose.connection.readyState;
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    if (state === 1) {
      return NextResponse.json({
        status: "success",
        message: "MongoDB is connected and working!",
        connectionState: states[state],
        database: mongoose.connection.db?.databaseName,
        uri: process.env.MONGODB_URI?.replace(
          /mongodb\+srv:\/\/[^:]+:[^@]+@/,
          "mongodb+srv://***:***@"
        ), // Hide credentials
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          message: "MongoDB connection failed",
          connectionState: states[state],
          instructions: "Please check your MONGODB_URI in .env.local",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message || "MongoDB connection error",
        error: error.message,
        instructions: [
          "1. Check if MONGODB_URI is set in .env.local",
          "2. For local: mongodb://localhost:27017/gear-guard",
          "3. For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/gear-guard",
          "4. Make sure MongoDB is running (local) or cluster is active (Atlas)",
          "5. Check network access (Atlas IP whitelist)",
        ],
      },
      { status: 500 }
    );
  }
}

