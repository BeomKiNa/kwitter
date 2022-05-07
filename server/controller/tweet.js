import { getSocketIO } from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  const { username } = req.query;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function updateTweet(req, res) {
  const {
    params: { id },
    body: { text },
  } = req;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.send(404).json({ message: `Tweet id(${id}) not found` });
  }

  if (tweet.userId !== req.userId) {
    return res
      .sendStatus(403)
      .json({ message: `You don't have permission for that tweet.` });
  }

  const update = await tweetRepository.update(id, text);
  res.status(200).json(update);
}

export async function deleteTweet(req, res) {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.send(404).json({ message: `Tweet id(${id}) not found` });
  }

  if (tweet.userId !== req.userId) {
    return res
      .sendStatus(403)
      .json({ message: `You don't have permission for that tweet.` });
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
