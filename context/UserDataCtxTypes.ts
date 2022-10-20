import { ExpenseI, IncomeI } from "types/user.interface";

export interface UserI {
  uid: string;
  email: string;
  displayName: string;
}

interface UserDataContextI {
  defaultSettings: {
    default_Currency: string;
    default_Timezone: string;
  };
  expenses: ExpenseI[];
  income: IncomeI[];
  investments: any;
}

export type { UserDataContextI };
