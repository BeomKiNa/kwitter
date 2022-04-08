import TokenStorage from "../db/token";
import HttpClient from "../network/http";

export type User = {
  username?: string;
  token?: string;
};

interface AuthServiceInterface {
  login: (username: string, password: string) => Promise<User>;
  me: () => Promise<User>;
  logout: () => Promise<void>;
  signup: (
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) => Promise<User>;
}

export default class AuthService implements AuthServiceInterface {
  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  async signup(
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username: string, password: string) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
