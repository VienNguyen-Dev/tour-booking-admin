// "use client";
// import { login } from "@/lib/actions/user.actions";
// import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback, useMemo } from "react";

// interface UserContextProps {
//   currentUser: User | null;
//   setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
// }
// export const UserContext = createContext<UserContextProps>({
//   currentUser: null,
//   setCurrentUser: () => {},
// });

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   const login = useCallback((response) => {
//     storeCredentials(response.credentials);
//     setCurrentUser(response.user);
//   }, []);

//   const contextValue = useMemo(
//     () => ({
//       currentUser,
//       login,
//     }),
//     [currentUser, login]
//   );

//   return <UserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</UserContext.Provider>;
// };

// export const useUser = () => useContext(UserContext);
