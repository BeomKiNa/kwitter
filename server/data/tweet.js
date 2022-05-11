import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
import * as userRepository from "./auth.js";

// NOSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 쿼리하는 횟수 > 사용자가 사용자의 정보를 업데이트 하는 횟수
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 관계형 조인쿼리의 성능이 좋지 않다.

// SQL: 관계형
// 조인쿼리의 성능이 좋다.

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model("Tweet", tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId);
  return new Tweet({ text, userId, username, name, url }).save();
}

export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}
