import UserAppPage from "features/UserAppPage";
import UserGreeting from "pages/user/UserGreeting";

export default function User({ user }) {
  return (
    <UserAppPage user={user}>
      <UserGreeting user={user} />
    </UserAppPage>
  );
}
