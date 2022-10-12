import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase.config";

import { ContextI, UserI } from "./AuthTypes";

const AuthContext = createContext<ContextI>({} as ContextI);

export const useAuth = () => useContext(AuthContext);

interface AuthContextProviderI {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderI) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        setUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email!,
          displayName: auth.currentUser.displayName!,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const values = {
    user,
    isLoading,
    handleChangeLoading,
    getUser,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
