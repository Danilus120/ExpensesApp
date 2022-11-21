import PercentBlock from "@/Molecules/PercentBlock";
import Card from "@/Atoms/Card";
import { toCapital } from "utils/utils";
import { useData } from "@/context/UserDataContext";
import styles from "./styles.module.scss";

interface MoneyCardProps {
  data: {
    pastMonth: number;
    today: number;
  };
  dataName: string;
  reversly?: boolean;
}

function MoneyCard({ data, dataName, reversly = false }: MoneyCardProps) {
  const { userData } = useData();

  return (
    <div
      className={`${styles["money-card"]} ${styles[`money-card--${dataName}`]}`}
    >
      <Card title={`Monthly ${toCapital(dataName)}`}>
        <div>
          <h3>
            {data.today || "0"} {userData.default_Currency}
          </h3>
          <PercentBlock
            firstValue={data.today}
            secondValue={data.pastMonth}
            timeRange="last month"
            reversly={reversly}
          />
        </div>
      </Card>
    </div>
  );
}

export default MoneyCard;
