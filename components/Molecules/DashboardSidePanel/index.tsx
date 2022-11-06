import Accordion from "@/Molecules/Accordion";
import LogoLink from "@/Atoms/LogoLink";

import { accordionItems, expensesItems, statistics } from "@/constants/menu";

import styles from "./styles.module.scss";
import StyledLink from "@/Atoms/StyledLink";

interface SidePanelI {
  isOpen: boolean;
  toggleSidepanel: () => void;
}

export default function DashboardSidePanel({
  isOpen,
  toggleSidepanel,
}: SidePanelI) {
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
                  {item.name}
                </StyledLink>
              </li>
            ))}
            <Accordion title="Statistics" options={statistics} />
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
