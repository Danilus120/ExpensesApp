import { useState } from "react";
import router from "next/router";

import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import ProfileModal from "@/Molecules/ProfileModal";
import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";

import { useAuth } from "@/context/AuthContext";

import { FiSettings, FiMenu } from "react-icons/fi";

import { currency_list } from "@/constants/currencyList";
import { settingsSchema } from "@/constants/validationSchema";

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
        <Form
          onSubmit={(data) => {
            console.log(data);
          }}
          schema={settingsSchema}
        >
          <Select
            label="Default currency"
            name="currency"
            options={currency_list.map((currency) => currency.code)}
          />
          <Input label="Default Timezone" name="timezone" />
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
        </Form>
      </Modal>
    </div>
  );
}
