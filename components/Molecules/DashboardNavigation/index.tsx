import * as yup from "yup";

import Button from "@/Atoms/Button";
import Input from "@/Atoms/Input";
import StyledLink from "@/Atoms/StyledLink";

import { useAuth } from "@/context/AuthContext";
import router from "next/router";
import { useState } from "react";

import { FiSettings, FiMenu } from "react-icons/fi";
import Form from "../Form";
import Modal from "../Modal";
import ProfileModal from "../ProfileModal";

import styles from "./styles.module.scss";
import { Select } from "@/Atoms/Select";
import { currency_list } from "@/constants/currencyList";

interface NavigationI {
  toggleSidepanel: () => void;
}

const settingsSchema = yup.object({
  currency: yup.string(),
  timezone: yup.string(),
});

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
          defaultValues={{ currency: "", timezone: "" }}
          onSubmit={(data) => {
            console.log(data);
          }}
          schema={settingsSchema}
        >
          {/* TODO: https://react-hook-form.com/advanced-usage/#SmartFormComponent -> Not working | https://codesandbox.io/s/react-hook-form-smart-form-component-forked-iq89z?file=/src/components.js */}
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
