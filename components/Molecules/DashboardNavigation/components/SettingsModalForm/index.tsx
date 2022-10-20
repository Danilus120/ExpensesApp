import Button from "@/Atoms/Button";
import Select from "@/Atoms/Select";
import { currency_list } from "@/constants/currencyList";
import { tzInts } from "@/constants/timezoneList";
import { settingsSchema } from "@/constants/validationSchema";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import { updateSettings } from "lib/firebaseMethods";
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
  const { defaultSettings } = useData();
  return (
    <Modal
      title="Settings"
      handleToggle={toggleSettingsModal}
      isOpened={isSettingsModalOpen}
    >
      <Form
        onSubmit={(data) => {
          user && updateSettings(user.uid, data);
        }}
        schema={settingsSchema}
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
          defaultValue={defaultSettings.default_Currency}
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
          defaultValue={defaultSettings.default_Timezone}
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
  );
}

export default SettingsModalForm;
