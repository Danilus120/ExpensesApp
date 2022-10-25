import Accordion from "@/Molecules/Accordion";
import LogoLink from "@/Atoms/LogoLink";

import { accordionItems } from "@/constants/menu";

import styles from "./styles.module.scss";

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
            {accordionItems.map((item) => (
              <li key={item[0].name}>
                <Accordion title={item[0].name} options={item} />
              </li>
            ))}
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
