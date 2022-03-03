import Tweets from "../components/Tweets";
import TweetService from "../service/tweet";

type AllTweetsProps = {
  tweetService: TweetService;
};

const AllTweets = ({ tweetService }: AllTweetsProps) => {
  return <Tweets tweetService={tweetService} addable={true} />;
};

export default AllTweets;
