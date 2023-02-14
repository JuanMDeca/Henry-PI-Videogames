import { useAuth0 } from "@auth0/auth0-react";
import style from "./Logout.module.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className={style.button}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
