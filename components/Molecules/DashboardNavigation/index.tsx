import Button from "@/Atoms/Button";
import StyledLink from "@/Atoms/StyledLink";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

import { FiSettings, FiMenu } from "react-icons/fi";
import ProfileModal from "../ProfileModal";

import styles from "./styles.module.scss";

interface NavigationI {
  toggleSidepanel: () => void;
  toggleModal: () => void;
}

export default function DashboardNavigation({
  toggleSidepanel,
  toggleModal,
}: NavigationI) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleProfileModal = () => {
    setIsProfileModalOpen((prev) => !prev);
  };

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
        <Button variant="ghost" callbackFn={toggleProfileModal}>
          <div className="avatar">
            <span>{firstLetterName}</span>
          </div>
        </Button>
      ) : (
        <StyledLink href="/login">
          <span>Log in</span>
        </StyledLink>
      )}

      <ProfileModal
        handleToggle={toggleProfileModal}
        isOpened={isProfileModalOpen}
      />
    </div>
  );
}
