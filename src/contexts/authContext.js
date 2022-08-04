import { createContext, useState } from "react";
import { fakeAuthProvider } from "./Auth";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    let [user, setUser] = useState(null);

    let login = (newUser, callback) => {
        return fakeAuthProvider.login(() => {
          setUser(newUser);
          callback();
        });
      };

    let logout = (callback) => {
        return fakeAuthProvider.logout(() => {
          setUser(null);
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