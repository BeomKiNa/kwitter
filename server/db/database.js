import Mongoose from "mongoose";
import { config } from "../config.js";

const {
  db: { host },
} = config;

export async function connectDB() {
  return Mongoose.connect(host);
}

export function useVirtualId(schema) {
  // _id -> id
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

// TODO: Delete blow

let db;
export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
