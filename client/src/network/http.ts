export default class HttpClient {
  constructor(private baseURL: string) {}

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
      throw Error(message);
    }

    return data;
  }
}
