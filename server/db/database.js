import Mongoose from "mongoose";
import { config } from "../config.js";

const {
  db: { host },
} = config;

export async function connectDB() {
  return Mongoose.connect(host);
}

// TODO: Delete blow

let db;
export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
