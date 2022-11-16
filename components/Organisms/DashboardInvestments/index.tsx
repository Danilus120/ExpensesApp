import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import { useData } from "@/context/UserDataContext";
import { el } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddInvestmentModal from "./components/AddInvestmentModal";

import styles from "./styles.module.scss";

function DashboardInvestments() {
  const { userData } = useData();

  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState(false);

  const [currenciesExchange, setCurrenciesExchange] = useState<
    Record<string, number>
  >({});

  const toggleAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const getCurrenciesExchange = async () => {
      const res = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${userData.default_Currency.toLowerCase()}.json`
      );

      const data = await res.json();

      const exchangeRate = data[userData.default_Currency.toLowerCase()];

      setCurrenciesExchange(exchangeRate);
    };

    getCurrenciesExchange();
  }, [userData.default_Currency]);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        callbackFn={toggleAddInvestmentModal}
      >
        <FiPlus /> Add Investment
      </Button>

      <input type="text" name="name" />
      {/* Formularz dodawania investments */}

      {/* Sortowanie i filtrowanie investments */}

      {/* Kafelki, aby zobaczyć wszystkie investments */}

      <AddInvestmentModal
        handleToggle={toggleAddInvestmentModal}
        isOpen={isAddInvestmentModalOpen}
        currenciesExchange={currenciesExchange}
      />
    </>
  );
}

export default DashboardInvestments;
