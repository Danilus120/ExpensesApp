import Select from "@/Atoms/Select";
import { currency_list } from "@/constants/currencyList";
import { tzInts } from "@/constants/timezoneList";
import { settingsSchema } from "@/constants/validationSchema";
import { useAuth } from "@/context/auth/AuthContext";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import React from "react";

interface SettingsModalFormProps {
  toggleSettingsModal: () => void;
  isSettingsModalOpen: boolean;
}

function SettingsModalForm({
  toggleSettingsModal,
  isSettingsModalOpen,
}: SettingsModalFormProps) {
  const { user } = useAuth();
  const { userData, actions } = useData();
  console.log(userData);
  return (
    <Modal
      title="Settings"
      handleToggle={toggleSettingsModal}
      isOpened={isSettingsModalOpen}
    >
      <Form
        onSubmit={(data) => {
          console.log(data);
          actions.updateSettings(data);
        }}
        schema={settingsSchema}
        handleToggle={toggleSettingsModal}
        options={{
          haveButtons: true,
          resetAfterSubmit: false,
        }}
      >
        <Select
          label="Default currency"
          name="currency"
          options={currency_list.map((currency) => {
            return {
              label: `${currency.name} (${currency.code})`,
              value: currency.code,
            };
          })}
          defaultValue={userData.default_Currency}
        />
        <Select
          label="Default timezone"
          name="timezone"
          options={tzInts.map((timezone) => {
            return {
              label: timezone.label,
              value: timezone.value,
            };
          })}
          defaultValue={userData.default_Timezone}
        />
      </Form>
    </Modal>
  );
}

export default SettingsModalForm;
