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
  async login(username: string, password: string) {
    return {
      username: "ki",
      token: "abc1234",
    };
  }

  async me() {
    return {
      username: "ki",
      token: "abc1234",
    };
  }

  async logout() {
    return;
  }

  async signup(
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) {
    return {
      username: "ki",
      token: "abc1234",
    };
  }
}
