import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TweetService, { Tweet, TweetsList } from "../service/tweet";
import Banner from "./Banner";
import NewTweetForm from "./NewTweetForm";
import TweetCard from "./TweetCard";

type TweetsProps = {
  tweetService: TweetService;
  username?: string;
  addable: boolean;
};

const Tweets = ({ tweetService, username, addable }: TweetsProps) => {
  const [tweets, setTweets] = useState<TweetsList>([]);
  const [error, setError] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    tweetService.getTweets(username).then((tweets) => setTweets(tweets));
  }, [tweetService, username]);

  const onCreated = (tweet: Tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId: number) =>
    tweetService
      .deleteTweet(tweetId)
      .then(() =>
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
      )
      .catch((error) => setError(error.toString()));

  const onUpdate = (tweetId: number, text: string) =>
    tweetService
      .updateTweet(tweetId, text)
      .then((updated) =>
        setTweets((tweets) =>
          tweets.map((item) => (item.id === updated.id ? updated : item))
        )
      )
      .catch((error) => error.toString());

  const onUsernameClick = (tweet: Tweet) => navigator(`/${tweet.username}`);

  const onError = (error: Error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <>
      {addable && (
        <NewTweetForm
          tweetService={tweetService}
          onError={onError}
          onCreated={onCreated}
        />
      )}
      {error && <Banner text={error} isAlert={true} />}
      {tweets.length === 0 && <p className="tweets-empty">No Tweets Yet</p>}
      <ul>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === "ki"} //
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
    </>
  );
};

export default Tweets;
