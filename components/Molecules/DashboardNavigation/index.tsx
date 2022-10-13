import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import StyledLink from "@/Atoms/StyledLink";

import { useAuth } from "@/context/AuthContext";
import router from "next/router";
import { useState } from "react";

import { FiSettings, FiMenu } from "react-icons/fi";
import Modal from "../Modal";
import ProfileModal from "../ProfileModal";

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

      <Modal
        title="Settings"
        handleToggle={toggleSettingsModal}
        isOpened={isSettingsModalOpen}
      >
        <Input
          handleChange={() => {}}
          options={{ title: "Default currency", id: "currency", value: "PLN" }}
        />
        <Input
          handleChange={() => {}}
          options={{
            title: "Default Timezone",
            id: "timezone",
            value:
              "(GMT+2:00) Sarajevo, Skopje, Warsaw, Zagreb (Central European Summer Time)",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            padding: "10px 0px 0px 0px",
          }}
        >
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            callbackFn={toggleSettingsModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
