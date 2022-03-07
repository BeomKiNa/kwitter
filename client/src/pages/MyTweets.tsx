import { useParams } from "react-router-dom";
import Tweets from "../components/Tweets";
import TweetService from "../service/tweet";

type MyTweetsProps = {
  tweetService: TweetService;
};

const MyTweets = ({ tweetService }: MyTweetsProps) => {
  const { username } = useParams();
  return (
    <Tweets tweetService={tweetService} username={username} addable={false} />
  );
};

export default MyTweets;
