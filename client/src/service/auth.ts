export default class AuthService {
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
