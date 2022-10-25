import { useState } from "react";
import router from "next/router";

import { FiSettings, FiMenu } from "react-icons/fi";

import ProfileModal from "@/Molecules/ProfileModal";
import Button from "@/Atoms/Button";
import SettingsModalForm from "./components/SettingsModalForm";

import { useAuth } from "@/context/auth/AuthContext";

import styles from "./styles.module.scss";

interface NavigationI {
  toggleSidepanel: () => void;
}

export default function DashboardNavigation({ toggleSidepanel }: NavigationI) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { user } = useAuth();

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen((prev) => !prev);
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen((prev) => !prev);
  };

  const firstLetterName =
    user && user.displayName?.length > 0
      ? user?.displayName.slice(0, 1).toUpperCase()
      : user?.email.slice(0, 1).toUpperCase();

  if (!user) {
    router.push("/login");
  }

  return (
    <div className={styles.navigation}>
      <Button variant="ghost" callbackFn={toggleSidepanel} iconOnly>
        <FiMenu />
      </Button>
      <Button
        variant="ghost"
        callbackFn={toggleSettingsModal}
        margin="left"
        iconOnly
      >
        <FiSettings />
      </Button>
      <Button variant="ghost" callbackFn={toggleProfileModal}>
        <div className="avatar">
          <span>{firstLetterName}</span>
        </div>
      </Button>

      <ProfileModal
        handleToggle={toggleProfileModal}
        isOpened={isProfileModalOpen}
      />

      <SettingsModalForm
        toggleSettingsModal={toggleSettingsModal}
        isSettingsModalOpen={isSettingsModalOpen}
      />
    </div>
  );
}
