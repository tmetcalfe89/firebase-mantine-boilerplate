import { useContext } from "react";
import { UserContext } from "context/UserContext";
import UserAppPage from "features/UserAppPage";
import UserGreeting from "pages/user/UserGreeting";
import { Route, Routes } from "react-router-dom";

export default function User() {
  const { user, loading } = useContext(UserContext);

  return (
    <UserAppPage user={user} loading={loading}>
      <Routes>
        <Route path="*" element={<UserGreeting />} />
      </Routes>
    </UserAppPage>
  );
}
