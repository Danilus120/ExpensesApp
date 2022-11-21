import { useEffect, useState } from "react";
import router from "next/router";
import Button from "@/Atoms/Button";
import { auth } from "config/firebase.config";
import { signOut } from "firebase/auth";
import { useData } from "@/context/UserDataContext";
import { getValueOfDataFromTimePeriod } from "utils/timeFunctions";
import styles from "./styles.module.scss";

interface ProfileModalProps {
  handleToggle: () => void;
  isOpened: boolean;
}

export default function ProfileModal({
  handleToggle,
  isOpened,
}: ProfileModalProps) {
  const { userData } = useData();
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlyIncomes, setMonthlyIncomes] = useState(0);
  const [summary, setSummary] = useState(0);

  useEffect(() => {
    setMonthlyExpenses(
      getValueOfDataFromTimePeriod(userData.expenses, "month")
    );
  }, [userData.expenses]);

  useEffect(() => {
    setMonthlyIncomes(getValueOfDataFromTimePeriod(userData.income, "month"));
  }, [userData.income]);

  useEffect(() => {
    setSummary(monthlyIncomes - monthlyExpenses);
  }, [monthlyExpenses, monthlyIncomes]);

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <div className={`${styles["profile-modal"]} ${isOpened && styles["show"]}`}>
      <div className={styles["profile-modal__card"]}>
        <div className={styles["profile-modal__card__header"]}>
          <h2>User Profile</h2>
        </div>
        <div className={styles["profile-modal__card__content"]}>
          <p>
            <b>Monthly income</b>: {monthlyIncomes} {userData.default_Currency}
          </p>
          <p>
            <b>Monthly expenses</b>: {monthlyExpenses}{" "}
            {userData.default_Currency}
          </p>
          <p>
            <b>Summary</b>: {summary} {userData.default_Currency}
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
      <div
        className={styles["profile-modal__background"]}
        onClick={handleToggle}
      ></div>
    </div>
  );
}
