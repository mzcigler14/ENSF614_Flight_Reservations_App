/*
 *  File Name: UserContext.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a context named UserContext
 * This is set when logging into the web page. Everytime it is changed
 * it is written to local storage. This way on refresh or when  page is changed
 * the user information can be read in a retained.
 */

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types.ts";

interface Props {
  children: ReactNode;
}
const initUser = {
  userid: "guest",
  userpassword: "guest",
  userrole: 1,
  legalname: "guest",
  DOB: "1900-01-01",
  email: "none",
  phonenumber: "None",
} as User;

const getInitialState = () => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as User) : initUser;
};

export const UserContext = createContext<User>(initUser);

export const UserContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User>(getInitialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // const setNewUser = (newUser: User) => setUser(newUser)

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export default { UserContextProvider, UserContext };
