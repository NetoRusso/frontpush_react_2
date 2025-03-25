import { useState, createContext, Children } from "react";

export const UserContext = createContext();

function UserProvider({children}) {

  const [username, setUsername] = useState('@joao')

  return (
    <UserContext.Provider value={{username, setUsername}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;