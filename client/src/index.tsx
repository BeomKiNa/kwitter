import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TweetService from "./service/tweet";

const tweetService = new TweetService();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App tweetService={tweetService} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
