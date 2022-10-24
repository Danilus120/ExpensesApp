import Button from "@/Atoms/Button";
import Select from "@/Atoms/Select";
import { currency_list } from "@/constants/currencyList";
import { tzInts } from "@/constants/timezoneList";
import { settingsSchema } from "@/constants/validationSchema";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import React from "react";
import { DataActionTypes } from "types/dataReducer.interface";

interface SettingsModalFormProps {
  toggleSettingsModal: () => void;
  isSettingsModalOpen: boolean;
}

function SettingsModalForm({
  toggleSettingsModal,
  isSettingsModalOpen,
}: SettingsModalFormProps) {
  const { user } = useAuth();
  const { userData, dispatch, updateSettings } = useData();
  return (
    <Modal
      title="Settings"
      handleToggle={toggleSettingsModal}
      isOpened={isSettingsModalOpen}
    >
      <Form
        onSubmit={(data) => {
          console.log(data);
          updateSettings(data);
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
