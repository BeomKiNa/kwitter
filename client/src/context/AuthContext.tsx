import {
  createContext,
  createRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Header from "../components/Header";
import Login from "../pages/Login";
import AuthService, { User } from "../service/auth";

type ContextType = {
  user?: User;
  signUp?: (
    username: string,
    password: string,
    name: string,
    email: string,
    url: string
  ) => Promise<void>;
  logIn?: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
};

type AuthProviderProps = {
  authService: AuthService;
  authErrorEventBus: AuthErrorEventBus;
  children: ReactNode;
};

const AuthContext = createContext<ContextType>({});

const contextRef = createRef();

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<undefined | User>(undefined);

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (
      username: string,
      password: string,
      name: string,
      email: string,
      url: string
    ) =>
      authService
        .signup(username, password, name, email, url)
        .then((user) => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (username: string, password: string) =>
      authService.login(username, password).then((user) => setUser(user)),
    [authService]
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  );

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Header />
          <Login onSignUp={signUp} onLogin={logIn} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export class AuthErrorEventBus {
  private callback = (err: Error) => {};

  listen(callback: (err: Error) => void) {
    this.callback = callback;
  }

  notify(error: Error) {
    this.callback(error);
  }
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
