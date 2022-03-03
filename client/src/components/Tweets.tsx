import TweetService from "../service/tweet";

type TweetsProps = {
  tweetService: TweetService;
  addable: boolean;
};

const Tweets = ({ tweetService, addable }: TweetsProps) => {
  return <div>tweets</div>;
};

export default Tweets;
