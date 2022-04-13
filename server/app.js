import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-error";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port, () =>
  console.log(`Start Server 🚀: http://localhost:${config.host.port}`)
);

const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  console.log("Client is here!");
  socketIO.emit("kwitter", "Welcome!");
  socketIO.emit("kwitter", "Welcome!");
});