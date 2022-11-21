import Input from "@/Atoms/Input";
import { investmentEditSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import React from "react";
import { strip } from "utils/investments/utils";
import { formatDate } from "utils/utils";

import styles from "./styles.module.scss";

interface EditInvestmentModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  modalEditRecordID: string;
}

function EditInvestmentModal({
  isOpen,
  handleToggle,
  modalEditRecordID,
}: EditInvestmentModalProps) {
  const { userData, actions } = useData();

  const investment = userData.investments.find(
    (el) => el.id === modalEditRecordID
  );

  if (!investment) {
    return null;
  }

  return (
    <>
      <Modal
        title="Edit Investment"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <div className={styles["info"]}>
          <p>Date: {formatDate(investment.date)}</p>
          <p>Payout Date: {formatDate(investment.payoutDate!)}</p>
          <p>Name: {investment.name}</p>
          <p>Value: {investment.value}</p>
          <p>Quantity: {investment.quantity}</p>
          <p>Payout Value: {investment.payoutValue}</p>
          <p>Summary: {investment.summary}</p>
        </div>
        <Form
          onSubmit={(data) => {
            const payoutExchangeRate = strip(
              investment.quantity / data.payoutValue
            );
            const summary = data.payoutValue - investment.value;

            const newInvestment: {
              payoutValue: number;
              payoutDate: number;
              payoutExchangeRate: number;
              summary: number;
              withdrawn: boolean;
            } = {
              payoutValue: data.payoutValue,
              payoutDate: investment.payoutDate!,
              payoutExchangeRate,
              summary: summary,
              withdrawn: investment.withdrawn,
            };

            actions.updateInvestment(investment?.id!, newInvestment);

            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
          }}
          schema={investmentEditSchema}
          handleToggle={handleToggle}
          defaultValues={{ payoutValue: investment.payoutValue }}
        >
          <Input
            type="number"
            step="1"
            label="Payout Value"
            name="payoutValue"
          />

          <Input type="hidden" step="1" label="" name="a" />
        </Form>
      </Modal>
    </>
  );
}

export default EditInvestmentModal;
