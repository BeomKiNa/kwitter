import { AuthErrorEventBus } from "../context/AuthContext";

export default class HttpClient {
  constructor(
    private baseURL: string,
    private authErrorEventBus: AuthErrorEventBus
  ) {}

  async fetch(url: string, options: RequestInit) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message: string =
        data && data.message ? data.message : "Somthing went wrong!";
      const error = new Error(message);
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }

    return data;
  }
}
