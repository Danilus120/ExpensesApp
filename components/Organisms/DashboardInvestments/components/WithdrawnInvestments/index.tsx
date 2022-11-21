import InvestmentsTable from "./components/InvestmentsTable";
import { investmentsTableColumns } from "@/constants/tableColumns";
import { useData } from "@/context/UserDataContext";
import { formatDate } from "utils/utils";

interface WithdrawnInvestmentsProps {
  setEditID: (id: string) => void;
}

function WithdrawnInvestments({ setEditID }: WithdrawnInvestmentsProps) {
  const { userData, actions } = useData();

  const activeInvestments = userData.investments
    .filter((el) => el.withdrawn)
    .sort((a, b) => b.payoutDate! - a.payoutDate!)
    .map((el) => {
      return {
        ...el,
        date: formatDate(el.date),
        payoutDate: formatDate(el.payoutDate!),
      };
    });

  return (
    <>
      <h3>Withdrawn</h3>

      <InvestmentsTable
        data={activeInvestments}
        columns={investmentsTableColumns}
        rollbackRecordFn={actions.rollbackInvestment}
        editRecordFn={setEditID}
      />
    </>
  );
}

export default WithdrawnInvestments;
