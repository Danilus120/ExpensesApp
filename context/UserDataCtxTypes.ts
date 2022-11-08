import {
  ExpenseFormDataI,
  IncomeFormDataI,
  InvestmentFormDataI,
  UserFirebaseI,
} from "types/user.interface";

export interface UserI {
  uid: string;
  email: string;
  displayName: string;
}

interface UserDataContextI {
  userData: UserFirebaseI;
  actions: {
    updateSettings: (options: { currency: string; timezone: string }) => void;
    addExpense: (expense: ExpenseFormDataI) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, newExpense: ExpenseFormDataI) => void;
    addIncome: (income: IncomeFormDataI) => void;
    deleteIncome: (id: string) => void;
    updateIncome: (id: string, newIncome: IncomeFormDataI) => void;
    addInvestment: (investment: InvestmentFormDataI) => void;
    deleteInvestment: (id: string) => void;
    updateInvestment: (id: string, newInvestment: InvestmentFormDataI) => void;
  };
}

export type { UserDataContextI };
