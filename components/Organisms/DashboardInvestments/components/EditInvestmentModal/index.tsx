import Input from "@/Atoms/Input";
import LoadingComponent from "@/Atoms/Loading";
import Select from "@/Atoms/Select";
import { cryptoSelects } from "@/constants/cryptoSelects";
import { investmentSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import React from "react";

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
        <Form
          onSubmit={(data) => {
            const newInvestment: {
              payoutValue: number;
              payoutDate: number;
              payoutExchangeRate: number;
              summary: number;
              withdrawn: boolean;
            } = {
              payoutValue: data.payoutValue,
              payoutDate: investment.payoutDate!,
              payoutExchangeRate: data.payoutExchangeRate,
              summary: data.summary,
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
          schema={investmentSchema}
          handleToggle={handleToggle}
          defaultValues={investment}
        >
          <Input
            type="number"
            step="0.01"
            label="Payout Value"
            name="payoutValue"
          />
          <Input
            type="number"
            step="0.00000000000001"
            label="Payout Exchange Rate"
            name="payoutExchangeRate"
          />
          <Input type="number" step="0.01" label="Summary" name="summary" />
        </Form>
      </Modal>
    </>
  );
}

export default EditInvestmentModal;
