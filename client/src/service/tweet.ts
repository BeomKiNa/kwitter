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
  constructor(private baseURL: string) {}

  async getTweets(username?: string) {
    const query = username ? `?username=${username}` : "";
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text: string) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, username: "ki", name: "Ki" }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId: number) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 204) {
      throw new Error();
    }
  }

  async updateTweet(tweetId: number, text: string) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }
}
