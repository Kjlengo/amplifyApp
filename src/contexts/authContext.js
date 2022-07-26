import { createContext, useState } from "react";
import { fakeAuthProvider } from "./Auth";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    let [user, setUser] = useState(false);

    let login = (newUser, callback) => {
        return fakeAuthProvider.login(() => {
          setUser(true);
          callback();
        });
      };

    let logout = (callback) => {
        return fakeAuthProvider.logout(() => {
          setUser(false);
          callback();
        });
      };


    const value = {user, login, logout};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}