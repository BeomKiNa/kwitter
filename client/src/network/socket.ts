import socket from "socket.io-client";

export default class Socket {
  private io;
  constructor(baseURL: string, getAccessToken: () => string | null) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (error) => {
      console.log("socket error", error.message);
    });
  }

  onSync(event: string, callback: any) {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message: any) => callback(message));
    return () => this.io.off(event);
  }
}
