import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Anime from "../models/Anime.js";
import { connectDB } from "../config/database.js";

dotenv.config();
await connectDB();

const seed = async () => {
  try {
    // Clear old data
    await User.deleteMany();
    await Anime.deleteMany();

    // Create admin user
    const admin = await User.create({
      username: "admin",
      email: "admin@myanimelist.com",
      password: "Admin123!",
      role: "admin",
    });

    console.log("Admin created:", admin.email);

    // Sample anime data
    const animeData = [
      {
        title: "Attack on Titan",
        description: "Humans fight against Titans to survive.",
        genres: ["Action", "Drama", "Fantasy"],
        studio: "MAPPA",
        episodes: 87,
        status: "Completed",
        releaseYear: 2013,
      },
      {
        title: "Death Note",
        description:
          "A notebook that kills anyone whose name is written in it.",
        genres: ["Thriller", "Supernatural"],
        studio: "Madhouse",
        episodes: 37,
        status: "Completed",
        releaseYear: 2006,
      },
      {
        title: "One Piece",
        description: "Pirate adventure to find the legendary treasure.",
        genres: ["Adventure", "Comedy"],
        studio: "Toei Animation",
        episodes: 1100,
        status: "Airing",
        releaseYear: 1999,
      },
    ];

    await Anime.insertMany(animeData);
    console.log("Anime seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
