import Form from "@/Molecules/Form";
import Modal from "@/Molecules/Modal";
import Input from "@/Atoms/Input";
import Select from "@/Atoms/Select";
import { cryptoSelects } from "@/constants/cryptoSelects";
import { investmentAddSchema } from "@/constants/validationSchema";
import { useData } from "@/context/UserDataContext";
import { generateInvestmentData } from "utils/investments/utils";

interface AddInvestmentModalProps {
  isOpen: boolean;
  handleToggle: () => void;
  currenciesExchange: Record<string, number>;
}

function AddInvestmentModal({
  isOpen,
  handleToggle,
  currenciesExchange,
}: AddInvestmentModalProps) {
  const { actions } = useData();

  return (
    <>
      <Modal
        title="Add Investment"
        isOpened={isOpen}
        handleToggle={handleToggle}
        size="large"
      >
        <Form
          onSubmit={(data) => {
            const investmentData = generateInvestmentData(
              data,
              currenciesExchange
            );

            actions.addInvestment(investmentData);

            handleToggle();
          }}
          options={{
            haveButtons: true,
            haveClearButton: true,
            resetAfterSubmit: true,
            haveCloseButton: true,
          }}
          schema={investmentAddSchema}
          handleToggle={handleToggle}
        >
          <Select
            label="Cryptocurrency"
            name="name"
            options={cryptoSelects}
            defaultValue={cryptoSelects[0].value}
          />

          <Input type="number" step="1" label="Value" name="value" />
        </Form>
      </Modal>
    </>
  );
}

export default AddInvestmentModal;
