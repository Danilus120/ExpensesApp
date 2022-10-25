import {
  ExpenseFormDataI,
  ExpenseI,
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
    addExpense: (expense: {
      category: string;
      currency: string;
      date: Date;
      description: string;
      price: string;
      shopName: string;
    }) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, newExpense: ExpenseFormDataI) => void;
    addIncome: () => void;
    deleteIncome: (id: string) => void;
    updateIncome: () => void;
    addInvestment: () => void;
    deleteInvestment: (id: string) => void;
    updateInvestment: () => void;
  };
}

export type { UserDataContextI };
