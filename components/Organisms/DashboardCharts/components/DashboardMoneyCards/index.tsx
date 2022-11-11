import Card from "@/Atoms/Card";
import { useData } from "@/context/UserDataContext";
import React from "react";
import { getSumOfValuesFromTimeRange } from "utils/charts/utils";
import { getDashboardComparisonData } from "utils/statistics/comparison";
import PercentBlock from "../PercentBlock";

import styles from "./styles.module.scss";

function DashboardMoneyCards() {
  const { userData } = useData();

  const cardsData = getDashboardComparisonData(userData);

  return (
    <div className={styles["blocks"]}>
      <div className={`${styles["block"]} ${styles["block--expenses"]}`}>
        <Card title="Monthly Expenses">
          <div>
            <h3>
              {cardsData.expenses.today || "0"} {userData.default_Currency}
            </h3>
            <PercentBlock
              firstValue={cardsData.expenses.today}
              secondValue={cardsData.expenses.pastMonth}
              timeRange="week"
              reversly={true}
            />
          </div>
        </Card>
      </div>
      <div className={`${styles["block"]} ${styles["block--income"]}`}>
        <Card title="Monthly Income">
          <div>
            <h3>
              {cardsData.income.today || "0"} {userData.default_Currency}
            </h3>
            <PercentBlock
              firstValue={cardsData.income.today}
              secondValue={cardsData.income.pastMonth}
              timeRange="week"
            />
          </div>
        </Card>
      </div>
      <div className={`${styles["block"]} ${styles["block--investments"]}`}>
        <Card title="Monthly Investments">
          <div>
            <h3>
              {cardsData.investments.today || "0"} {userData.default_Currency}
            </h3>
            <PercentBlock
              firstValue={cardsData.investments.today}
              secondValue={cardsData.investments.pastMonth}
              timeRange="week"
            />
          </div>
        </Card>
      </div>
      <div className={`${styles["block"]} ${styles["block--summary"]}`}>
        <Card title="Monthly Savings">
          <div>
            <h3>
              {cardsData.savings.today || "0"} {userData.default_Currency}
            </h3>
            <PercentBlock
              firstValue={cardsData.savings.today}
              secondValue={cardsData.savings.pastMonth}
              timeRange="week"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DashboardMoneyCards;
