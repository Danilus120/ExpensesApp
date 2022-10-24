import { Dispatch } from "react";
import { DataActionType } from "types/dataReducer.interface";
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
  dispatch: Dispatch<DataActionType>;
  actions: {
    updateSettings: (options: { currency: string; timezone: string }) => void;
    addExpense: (expense: ExpenseI) => void;
    addNewExpense: (expense: {
      category: string;
      currency: string;
      date: Date;
      description: string;
      price: string;
      shopName: string;
    }) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, newExpense: ExpenseFormDataI) => void;
  };
}

export type { UserDataContextI };
