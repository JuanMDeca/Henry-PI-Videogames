import { useAuth0 } from "@auth0/auth0-react";
import style from "./Login.module.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className={style.button}>
      Login
    </button>
  );
};

export default LoginButton;
