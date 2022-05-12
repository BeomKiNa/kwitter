import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: config.cors.allowedOrigin,
      },
    });

    this.io.use((socket, next) => {
      // token을 주고 받을 때는 query가 아닌 quth를 이용해야 함
      // query를 이용하면 노출이 되기 때문에 보안에 좋지 못함
      // const token = socket.handshake.query && socket.handshake.query.token;

      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error"));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error("Authentication error"));
        }
        next();
      });
    });

    this.io.on("connection", (socket) => {
      console.log("Socket client connected");
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}
