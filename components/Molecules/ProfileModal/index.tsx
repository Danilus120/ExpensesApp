import Button from "@/Atoms/Button";
import { auth } from "config/firebase.config";
import { signOut } from "firebase/auth";
import router from "next/router";
import styles from "./styles.module.scss";

interface ProfileModalI {
  handleToggle: () => void;
  isOpened: boolean;
}

export default function ProfileModal({
  handleToggle,
  isOpened,
}: ProfileModalI) {
  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <div className={`${styles["modal"]} ${isOpened && styles["show"]}`}>
      <div className={styles["modal__card"]}>
        <div className={styles["modal__card__header"]}>
          <h2>User Profile</h2>
        </div>
        <div className={styles["modal__card__content"]}>
          <p>
            <b>Monthly income</b>: 4200 PLN
          </p>
          <p>
            <b>Monthly expenses</b>: 1200 PLN
          </p>
          <p>
            <b>Summary</b>: 3000 PLN
          </p>
          <Button
            variant="contained"
            color="primary"
            align="center"
            callbackFn={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </div>
      </div>
      <div className={styles["modal__background"]} onClick={handleToggle}></div>
    </div>
  );
}
