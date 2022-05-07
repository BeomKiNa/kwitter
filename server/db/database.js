import MongoDb from "mongodb";
import { config } from "../config.js";

const {
  db: { host },
} = config;

let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(host).then((client) => {
    db = client.db();
  });
}

export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
