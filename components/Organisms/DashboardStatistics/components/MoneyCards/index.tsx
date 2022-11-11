import Card from "@/Atoms/Card";
import { useData } from "@/context/UserDataContext";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";
import { capitalizeFirstLetter } from "utils/utils";
import styles from "./styles.module.scss";

interface MoneyCardsProps {
  timeRange: "week" | "month" | "year";
}

function MoneyCards({ timeRange }: MoneyCardsProps) {
  const { userData } = useData();

  const cardsData = {
    expensesValue: getSumOfValuesFromTimeRange(userData.expenses, timeRange),
    incomeValue: getSumOfValuesFromTimeRange(userData.income, timeRange),
  };

  const timeSpec = capitalizeFirstLetter(timeRange);

  return (
    <div className={styles["blocks"]}>
      <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
        <Card title={`${timeSpec}ly Expenses value`}>
          <h3>
            {cardsData.expensesValue || "0"} {userData.default_Currency}
          </h3>
        </Card>
      </div>
      <div className={`${styles["block"]} ${styles["block--income"]}`}>
        <Card title={`${timeSpec}ly Income value`}>
          <h3>
            {cardsData.incomeValue || "0"} {userData.default_Currency}
          </h3>
        </Card>
      </div>
      <div className={`${styles["block"]} ${styles["block--investments"]}`}>
        <Card title={`${timeSpec}ly Investments value`}>
          <h3>0 {userData.default_Currency}</h3>
        </Card>
      </div>
    </div>
  );
}

export default MoneyCards;
