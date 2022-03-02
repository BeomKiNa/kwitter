import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";

function App() {
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
        <Route path="/" />
        <Route path="/:username" />
      </Routes>
    </div>
  );
}

export default App;
