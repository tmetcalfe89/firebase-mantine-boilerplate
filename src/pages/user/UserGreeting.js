import { useContext } from "react";
import { UserContext } from "context/UserContext";

export default function UserGreeting() {
  const { user } = useContext(UserContext);
  return <>Hi {user.displayName}!</>;
}
