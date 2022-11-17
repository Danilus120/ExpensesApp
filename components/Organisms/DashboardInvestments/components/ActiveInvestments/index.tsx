import Button from "@/Atoms/Button";
import Card from "@/Atoms/Card";
import { cryptoSelects } from "@/constants/cryptoSelects";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { InvestmentI } from "types/user.interface";
import { generateInvestmentPayoutData } from "utils/investments/utils";
import { formatDate } from "utils/utils";

import styles from "./styles.module.scss";

interface ActiveInvestmentsProps {
  currenciesExchange: Record<string, number>;
}

function ActiveInvestments({ currenciesExchange }: ActiveInvestmentsProps) {
  const { userData, actions } = useData();

  const activeInvestments = userData.investments
    .filter((el) => el.withdrawn === false)
    .sort((a, b) => b.date - a.date);

  return (
    <>
      <h3>Active</h3>
      <div className={styles["blocks"]}>
        {activeInvestments.map((investment) => {
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
                  <div className={`${styles["block__content__date"]}`}>
                    {formatDate(investment.date)}
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
                  <div className={styles["buttons"]}>
                    <Button
                      color="error"
                      size="small"
                      callbackFn={() => actions.deleteInvestment(investment.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="warning"
                      size="small"
                      callbackFn={() =>
                        actions.updateInvestment(investment.id, data)
                      }
                    >
                      Payout
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ActiveInvestments;
