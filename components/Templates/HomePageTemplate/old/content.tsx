import Image from "next/image";
import Link from "next/link";

import { RiFundsBoxLine } from "react-icons/ri";
import { FiArrowRight, FiPieChart } from "react-icons/fi";
import { GiTakeMyMoney, GiProfit } from "react-icons/gi";

import styles from "./content.module.scss";

export default function HomePageContent() {
  return (
    <>
      <div className={styles["heading"]} id="home">
        <h1>Expenses App</h1>
        <p>
          An application that allows you to calculate your expenses, income and
          investments
        </p>
        <Link href="/login">
          <a>
            <button>
              Join to us <FiArrowRight />
            </button>
          </a>
        </Link>
      </div>
      <div className={styles["description"]} id="description">
        <div className={styles["imgBox"]}>
          <Image
            src="/dashboard.png"
            alt="dashboard"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* TODO: Change background-color + paddings + margins */}
        <p>
          The application was born out of the need to account for your expenses,
          income and investments, in a convenient environment, instead of in
          excel.
        </p>
      </div>
      <div className={styles["features"]} id="features">
        <div className={styles["features__grid"]}>
          {/* TODO: Slider while mobile*/}
          <div className={styles["item"]}>
            Expenses
            <GiTakeMyMoney />
          </div>
          <div className={styles["item"]}>
            Income
            <GiProfit />
          </div>
          <div className={styles["item"]}>
            Investments
            <RiFundsBoxLine />
          </div>
          <div className={styles["item"]}>
            Statistics
            <FiPieChart />
          </div>
        </div>
      </div>
    </>
  );
}
