import { createContext, useCallback, useMemo, useState } from "react";

const MY_AUTH_APP = "MY_AUTH_APP_1";

export const AuthContext = createContext();

export default function AuthProvider({children}){
    const [user, setUser] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);

    const login = useCallback(function () {
      window.localStorage.setItem(MY_AUTH_APP, true);
      setUser(true);
    }, []);

    let logout = useCallback(function () {
      window.localStorage.removeItem(MY_AUTH_APP);
      setUser(false);
    }, []);


    const value = useMemo(()=> ({
      login, 
      logout,
      user
    }), [login, logout, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
