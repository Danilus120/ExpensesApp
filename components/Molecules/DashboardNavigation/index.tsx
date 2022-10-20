import { useState } from "react";
import router from "next/router";

import { FiSettings, FiMenu } from "react-icons/fi";

import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import ProfileModal from "@/Molecules/ProfileModal";
import Button from "@/Atoms/Button";
import Select from "@/Atoms/Select";

import { useAuth } from "@/context/AuthContext";

import { currency_list } from "@/constants/currencyList";
import { settingsSchema } from "@/constants/validationSchema";
import { tzInts } from "@/constants/timezoneList";

import styles from "./styles.module.scss";
import { updateSettings } from "lib/firebaseMethods";
import { useData } from "@/context/UserDataContext";

interface NavigationI {
  toggleSidepanel: () => void;
}

export default function DashboardNavigation({ toggleSidepanel }: NavigationI) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { user } = useAuth();
  const { defaultSettings } = useData();
  // console.log(defaultSettings);

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
          defaultValues={defaultSettings}
          onSubmit={(data) => {
            console.log(data);
            // user && updateSettings(user.uid, data);
          }}
          schema={settingsSchema}
        >
          <Select
            label="Default currency"
            name="default_Currency"
            options={currency_list.map((currency) => {
              return {
                label: `${currency.name} (${currency.code})`,
                value: currency.code,
              };
            })}
          />
          <Select
            label="Default timezone"
            name="default_Timezone"
            options={tzInts.map((timezone) => {
              return {
                label: timezone.label,
                value: timezone.value,
              };
            })}
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
        </Form>
      </Modal>
    </div>
  );
}
