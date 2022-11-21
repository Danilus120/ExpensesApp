import MoneyCard from "./components/MoneyCard";
import { useData } from "@/context/UserDataContext";
import { getDashboardComparisonData } from "utils/statistics/comparison";
import styles from "./styles.module.scss";

function DashboardMoneyCards({ chosenDate }: { chosenDate: Date }) {
  const { userData } = useData();

  const cardsData = getDashboardComparisonData(userData, chosenDate);

  return (
    <div className={styles["money-cards"]}>
      <MoneyCard
        data={cardsData.expenses}
        reversly={true}
        dataName="expenses"
      />
      <MoneyCard data={cardsData.income} dataName="income" />
      <MoneyCard data={cardsData.investments} dataName="investments" />
      <MoneyCard data={cardsData.savings} dataName="savings" />
    </div>
  );
}

export default DashboardMoneyCards;
