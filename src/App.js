import AppWrapper from "components/AppWrapper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase";
import Loading from "./views/Loading";
import Public from "./views/Public";
import User from "./views/User";

function App() {
  const [user, loadingUser] = useAuthState(auth);

  if (loadingUser) {
    return <Loading />;
  }

  if (!user) {
    return <Public />;
  }

  return <User user={user} />;
}

export default function WrappedApp() {
  return (
    <AppWrapper>
      <App />
    </AppWrapper>
  );
}
