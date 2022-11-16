import Button from "@/Atoms/Button";
import Card from "@/Atoms/Card";
import LoadingComponent from "@/Atoms/Loading";
import { cryptoSelects } from "@/constants/cryptoSelects";
import { useData } from "@/context/UserDataContext";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { generateInvestmentPayoutData } from "utils/investments/utils";
import AddInvestmentModal from "./components/AddInvestmentModal";

import styles from "./styles.module.scss";

function DashboardInvestments() {
  const { userData, actions } = useData();

  const [isAddInvestmentModalOpen, setIsAddInvestmentModalOpen] =
    useState(false);

  const [currenciesExchange, setCurrenciesExchange] = useState<
    Record<string, number>
  >({});

  const [isLoading, setIsLoading] = useState(true);

  const toggleAddInvestmentModal = () => {
    setIsAddInvestmentModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const getCurrenciesExchange = async () => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${userData.default_Currency.toLowerCase()}.json`
        );

        const data = await res.json();

        const exchangeRate = data[userData.default_Currency.toLowerCase()];

        setCurrenciesExchange(exchangeRate);
      } catch (err: any) {
        return err.message;
      }
    };

    getCurrenciesExchange();
  }, [userData.default_Currency]);

  useEffect(() => {
    if (Object.keys(currenciesExchange).length > 0) {
      setIsLoading(false);
    }
  }, [currenciesExchange]);

  if (isLoading) {
    return <LoadingComponent color="#4E739E" />;
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        callbackFn={toggleAddInvestmentModal}
      >
        <FiPlus /> Add Investment
      </Button>

      <div className={styles["blocks"]}>
        {userData.investments.map((investment) => {
          const cryptoName = cryptoSelects.find(
            (el) => el.value === investment.name
          )?.label;

          const data = generateInvestmentPayoutData(
            investment,
            currenciesExchange
          );

          return (
            <div className={styles["block"]} key={investment.id}>
              <Card>
                <div className={styles["block__content"]}>
                  <div className={`${styles["block__content__name"]}`}>
                    <h3>{cryptoName}</h3>
                  </div>
                  <div className={`${styles["block__content__quantity"]}`}>
                    <p>
                      Quantity: {investment.quantity.toFixed(4)}{" "}
                      {investment.name}
                    </p>
                  </div>
                  <div className={`${styles["block__content__value"]}`}>
                    <p>
                      {investment.value} {userData.default_Currency}
                    </p>
                  </div>
                  <Button
                    callbackFn={() =>
                      actions.updateInvestment(investment.id, data)
                    }
                  >
                    Payout
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

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
