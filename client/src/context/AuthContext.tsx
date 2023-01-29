import axios from "axios";
import { createContext, SetStateAction, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginType, UserType } from "../typings";

interface IAuthContext {
  // either you'll have user, you won't or it'll be fetching (Promise<any>)
  currentUser: UserType | Promise<any> | null;
  login: (values: LoginType) => Promise<void>;
  logout: () => void;
  setCurrentUser: React.Dispatch<
    SetStateAction<UserType | Promise<any> | null>
  >;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return user != null ? JSON.parse(user) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const user = getUser();

  const [currentUser, setCurrentUser] = useState<
    UserType | Promise<any> | null
  >(user || null);

  const login = async (values: LoginType) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      values,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const logout = () => {
    axios.post("http://localhost:8000/api/auth/logout");
    setCurrentUser(null);
  };

  // every time user changes, store it in localstorage
  useEffect(() => {
    const storeUser = async () => {
      // stringify because you can't store object in localStorage
      try {
        await AsyncStorage.setItem("user", JSON.stringify(currentUser));
      } catch (error) {
        console.log(error);
      }
    };
    storeUser();
  }, [currentUser]);

  return (
    // will be "cannot find namespace" error here unless you give this file a .tsx extension
    <AuthContext.Provider
      value={{ login, logout, currentUser, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
