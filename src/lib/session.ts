import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const SESSION_DURATION = 3600000;

export const setLoginTime = () => {
  localStorage.setItem("loginTime", Date.now().toString());
};

export const checkSessionExpiry = async () => {
  const loginTime = localStorage.getItem("loginTime");
  if (loginTime) {
    const elapsed = Date.now() - parseInt(loginTime, 10);
    if (elapsed > SESSION_DURATION) {
      await signOut(auth);
      localStorage.removeItem("loginTime");
      return true;
    }
  }
  return false;
};
