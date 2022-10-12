import Button from "@/Atoms/Button";
import StyledLink from "@/Atoms/StyledLink";

import { useAuth } from "@/context/AuthContext";

import { FiSettings, FiMenu } from "react-icons/fi";

import styles from "./styles.module.scss";

interface NavigationI {
  toggleSidepanel: () => void;
  toggleModal: () => void;
}

export default function DashboardNavigation({
  toggleSidepanel,
  toggleModal,
}: NavigationI) {
  const { user } = useAuth();

  const firstLetterName =
    user && user.displayName?.length > 0
      ? user?.displayName.slice(0, 1).toUpperCase()
      : user?.email.slice(0, 1).toUpperCase();

  return (
    <div className={styles.navigation}>
      <Button variant="ghost" callbackFn={toggleSidepanel} iconOnly>
        <FiMenu />
      </Button>
      <Button variant="ghost" callbackFn={toggleModal} margin="left" iconOnly>
        <FiSettings />
      </Button>
      {user ? (
        <Button variant="ghost">
          <div className="avatar">
            <span>{firstLetterName}</span>
          </div>
        </Button>
      ) : (
        <StyledLink href="/login">
          <span>Log in</span>
        </StyledLink>
      )}
    </div>
  );
}
