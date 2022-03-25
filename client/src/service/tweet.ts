import HttpClient from "../network/http";

export type Tweet = {
  id: number;
  text: string;
  createdAt: string;
  name: string;
  username: string;
  url?: string;
};

export type TweetsList = Array<Tweet>;

interface TweetServiceInterface {
  getTweets: (username?: string) => Promise<TweetsList>;
  postTweet: (text: string) => Promise<Tweet>;
  deleteTweet: (tweetId: number) => Promise<void>;
  updateTweet: (tweetId: number, text: string) => Promise<Tweet>;
}

export default class TweetService implements TweetServiceInterface {
  constructor(private http: HttpClient) {}

  async getTweets(username?: string) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, { method: "GET" });
  }

  async postTweet(text: string) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "ki", name: "Ki" }),
    });
  }

  async deleteTweet(tweetId: number) {
    this.http.fetch(`/tweets/${tweetId}`, { method: "DELETE" });
  }

  async updateTweet(tweetId: number, text: string) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}
