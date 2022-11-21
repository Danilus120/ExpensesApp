import Accordion from "@/Molecules/Accordion";
import LogoLink from "@/Atoms/LogoLink";
import StyledLink from "@/Atoms/StyledLink";
import { expensesItems, statistics } from "@/constants/menu";
import styles from "./styles.module.scss";
import { GiPieChart } from "react-icons/gi";

interface SidePanelProps {
  isOpen: boolean;
  toggleSidepanel: () => void;
}

export default function DashboardSidePanel({
  isOpen,
  toggleSidepanel,
}: SidePanelProps) {
  return (
    <div
      className={`${styles.sidepanel} ${styles["sidepanel"]} ${
        isOpen && styles["active"]
      }`}
    >
      <div className={styles["sidepanel__content"]}>
        <div className={styles["sidepanel__logo"]}>
          <LogoLink />
        </div>
        <nav className={styles["sidepanel__nav"]}>
          <ul>
            {/* {accordionItems.map((item) => (
              <li key={item[0].name}>
                <Accordion title={item[0].name} options={item} />
              </li>
            ))} */}
            {expensesItems.map((item) => (
              <li key={item.name}>
                <StyledLink variant="ghost" href={item.link}>
                  {item.icon} {item.name}
                </StyledLink>
              </li>
            ))}
            <li>
              <Accordion title="Statistics" options={statistics} />
            </li>
          </ul>
        </nav>
      </div>
      <div
        className={styles["sidepanel__background"]}
        onClick={toggleSidepanel}
      ></div>
    </div>
  );
}
