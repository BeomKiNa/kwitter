import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import AllTweets from "./pages/AllTweets";
import TweetService from "./service/tweet";

type AppProps = {
  tweetService: TweetService;
};

function App({ tweetService }: AppProps) {
  const navigate = useNavigate();

  const username = "ki"; //

  const onAllTweets = () => {
    navigate("/");
  };

  const onMyTweets = () => {
    navigate(`/${username}`);
  };

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      // logout();
      navigate("/");
    }
  };

  return (
    <div className="App">
      <Header
        username={username}
        onLogout={onLogout}
        onMyTweets={onMyTweets}
        onAllTweets={onAllTweets}
      />
      <Routes>
        <Route path="/" element={<AllTweets tweetService={tweetService} />} />
        <Route path="/:username" />
      </Routes>
    </div>
  );
}

export default App;
