import PercentBlock from "@/Molecules/PercentBlock";
import Button from "@/Atoms/Button";
import Card from "@/Atoms/Card";
import { cryptoSelects } from "@/constants/cryptoSelects";
import { useData } from "@/context/UserDataContext";
import { generateInvestmentPayoutData } from "utils/investments/utils";
import { formatDate } from "utils/utils";
import styles from "./styles.module.scss";
import DeleteButton from "@/Atoms/DeleteButton";
import ConfirmationModalContextProvider from "@/context/modalConfirmationContext";

interface ActiveInvestmentsProps {
  currenciesExchange: Record<string, number>;
}

function ActiveInvestments({ currenciesExchange }: ActiveInvestmentsProps) {
  const { userData, actions } = useData();

  const activeInvestments = userData.investments
    .filter((el) => !el.withdrawn)
    .sort((a, b) => b.date - a.date);

  return (
    <>
      <ConfirmationModalContextProvider>
        <h3>Active</h3>
        <div className={styles["activeInvestments"]}>
          {activeInvestments.map((investment) => {
            const cryptoName = cryptoSelects.find(
              (el) => el.value === investment.name
            )?.label;

            const data = generateInvestmentPayoutData(
              investment,
              currenciesExchange
            );

            return (
              <div className={styles["investment"]} key={investment.id}>
                <Card>
                  <div className={styles["investment__content"]}>
                    <div className={`${styles["investment__content__name"]}`}>
                      <h3>{cryptoName}</h3>
                    </div>
                    <div className={`${styles["investment__content__date"]}`}>
                      <p> Date: {formatDate(investment.date)}</p>
                    </div>
                    <div
                      className={`${styles["investment__content__quantity"]}`}
                    >
                      <p>
                        Quantity: {investment.quantity.toFixed(4)}{" "}
                        {investment.name}
                      </p>
                    </div>
                    <div className={`${styles["investment__content__value"]}`}>
                      <p>
                        Value: {investment.value} {userData.default_Currency}
                      </p>
                    </div>

                    <PercentBlock
                      firstValue={data.payoutValue}
                      secondValue={investment.value}
                      timeRange="buyed"
                    />

                    <div className={styles["buttons"]}>
                      <DeleteButton
                        color="error"
                        size="small"
                        onClick={() => actions.deleteInvestment(investment.id)}
                      >
                        Delete
                      </DeleteButton>
                      {/* <Button
                      color="error"
                      size="small"
                      callbackFn={() => actions.deleteInvestment(investment.id)}
                    >
                      Delete
                    </Button> */}
                      <Button
                        color="success"
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
      </ConfirmationModalContextProvider>
    </>
  );
}

export default ActiveInvestments;
