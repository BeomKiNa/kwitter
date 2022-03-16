import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";
import AllTweets from "./pages/AllTweets";
import MyTweets from "./pages/MyTweets";
import TweetService from "./service/tweet";

type AppProps = {
  tweetService: TweetService;
};

function App({ tweetService }: AppProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const onAllTweets = () => {
    navigate("/");
  };

  const onMyTweets = () => {
    navigate(`/${user!.username}`);
  };

  const onLogout = () => {
    if (window.confirm("Do you want to log out?")) {
      logout && logout();
      navigate("/");
    }
  };

  return (
    <div className="App">
      <Header
        username={user!.username}
        onLogout={onLogout}
        onMyTweets={onMyTweets}
        onAllTweets={onAllTweets}
      />
      <Routes>
        <Route path="/" element={<AllTweets tweetService={tweetService} />} />
        <Route
          path="/:username"
          element={<MyTweets tweetService={tweetService} />}
        />
      </Routes>
    </div>
  );
}

export default App;
