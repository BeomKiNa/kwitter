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
  private tweets: TweetsList = [
    {
      id: 1,
      text: "first tweet!",
      createdAt: new Date().toISOString(),
      name: "Bob",
      username: "bob",
      url: "https://images.unsplash.com/photo-1646291127886-613cd73974d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  async getTweets(username?: string) {
    return username
      ? this.tweets.filter((tweet) => tweet.username === username)
      : this.tweets;
  }

  async postTweet(text: string) {
    const tweet: Tweet = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      name: "Ki",
      username: "ki",
      text,
    };
    this.tweets.push(tweet);
    return tweet;
  }

  async deleteTweet(tweetId: number) {
    this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  }

  async updateTweet(tweetId: number, text: string) {
    const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    if (!tweet) {
      throw new Error("tweet not found!");
    }
    tweet.text = text;
    return tweet;
  }
}
