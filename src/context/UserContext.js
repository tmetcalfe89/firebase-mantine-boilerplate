import { auth } from "api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const { createContext } = require("react");

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, loadingUser] = useAuthState(auth);

  return (
    <UserContext.Provider
      value={{
        user,
        loading: loadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
