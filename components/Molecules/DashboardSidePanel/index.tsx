import Accordion from "@/Molecules/Accordion";
import LogoLink from "@/Atoms/LogoLink";
import StyledLink from "@/Atoms/StyledLink";
import { expensesItems, statistics } from "@/constants/menu";
import styles from "./styles.module.scss";

interface SidePanelProps {
  isOpen: boolean;
  toggleSidepanel: () => void;
}

export default function DashboardSidePanel({
  isOpen,
  toggleSidepanel,
}: SidePanelProps) {
  const { name, icon, items } = statistics;

  return (
    <div className={`${styles["sidepanel"]} ${isOpen && styles["active"]}`}>
      <div className={styles["sidepanel__content"]}>
        <div className={styles["sidepanel__logo"]}>
          <LogoLink />
        </div>
        <nav className={styles["sidepanel__nav"]}>
          <ul>
            {expensesItems.map((item) => (
              <li key={item.name}>
                <StyledLink variant="ghost" href={item.link}>
                  {item.icon} {item.name}
                </StyledLink>
              </li>
            ))}
            <li>
              <Accordion title={name} icon={icon} options={items} />
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
