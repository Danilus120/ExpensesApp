import router from "next/router";

import Button from "@/Atoms/Button";

import { auth } from "config/firebase.config";
import { signOut } from "firebase/auth";

import styles from "./styles.module.scss";
import {
  getValueOfExpensesInActualMonth,
  getValueOfIncomesInActualMonth,
} from "utils/utils";
import { useData } from "@/context/UserDataContext";
import { useEffect, useState } from "react";

interface ProfileModalI {
  handleToggle: () => void;
  isOpened: boolean;
}

export default function ProfileModal({
  handleToggle,
  isOpened,
}: ProfileModalI) {
  const { userData } = useData();
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlyIncomes, setMonthlyIncomes] = useState(0);
  const [summary, setSummary] = useState(0);

  useEffect(() => {
    setMonthlyExpenses(getValueOfExpensesInActualMonth(userData.expenses));
  }, [userData.expenses]);

  useEffect(() => {
    setMonthlyIncomes(getValueOfIncomesInActualMonth(userData.income));
  }, [userData.income]);

  useEffect(() => {
    setSummary(monthlyIncomes - monthlyExpenses);
  }, [monthlyExpenses, monthlyIncomes]);

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  // TODO: bypass other currencies
  return (
    <div className={`${styles["modal"]} ${isOpened && styles["show"]}`}>
      <div className={styles["modal__card"]}>
        <div className={styles["modal__card__header"]}>
          <h2>User Profile</h2>
        </div>
        <div className={styles["modal__card__content"]}>
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
      <div className={styles["modal__background"]} onClick={handleToggle}></div>
    </div>
  );
}
