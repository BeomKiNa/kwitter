import socket from "socket.io-client";

export default class Socket {
  private io;
  constructor(baseURL: string, getAccessToken: () => string | null) {
    // token을 주고 받을 때는 query가 아닌 quth를 이용해야 함
    // query를 이용하면 노출이 되기 때문에 보안에 좋지 못함
    // const io = socket(baseURL, {
    //   query: { token: getAccessToken() },
    // });

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
