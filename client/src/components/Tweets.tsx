import { useEffect, useState } from "react";
import TweetService, { TweetsList } from "../service/tweet";

type TweetsProps = {
  tweetService: TweetService;
  addable: boolean;
};

const Tweets = ({ tweetService, addable }: TweetsProps) => {
  const [tweets, setTweets] = useState<TweetsList>([]);

  useEffect(() => {
    tweetService.getTweets("ki").then((tweets) => setTweets(tweets));
  }, [tweetService]);

  return (
    <ul>
      {tweets.map((tweet) => (
        <li key={tweet.id}>{tweet.name}</li>
      ))}
    </ul>
  );
};

export default Tweets;
