"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";

import axios from "axios";
import { ContextUserProps } from "./types/context-user";
import config from "../../config/config";
import { DecodeUser } from "../../utils/decode/user/decode-user";
import { UserI } from "../../entities/user.entites";

const ContextUser = createContext<ContextUserProps | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserI | null>(null);
  const [emailForRecovery, setEmailForRecovery] = useState<string | null>(null);

  const api = config.API;
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${api}/login`, {
        withCredentials: true,
      });

      if (res.status === 200 && res?.data?.token) {
        const data = DecodeUser(res.data?.token);
        setUser(data);
        return;
      }
    } catch (error) {}
  }, [api, setUser]);

  useEffect(() => {
    fetchUser();
  }, [api, fetchUser]);

  const contextValue: ContextUserProps = {
    user,
    setUser,
    emailForRecovery,
    setEmailForRecovery,
  };

  return (
    <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>
  );
};

const useUser = () => {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  const user: UserI | null = context.user;
  const setUser: React.Dispatch<React.SetStateAction<UserI | null>> =
    context.setUser;
  return { user, setUser };
};

export { ContextUser, UserProvider, useUser };
