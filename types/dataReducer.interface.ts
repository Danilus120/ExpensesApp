import { ExpenseI, IncomeI, InvestmentI } from "./user.interface";

export enum DataActionTypes {
  updateUser = "UPDATE_USER",
  updateSettings = "UPDATE_SETTINGS",
  addExpense = "ADD_EXPENSE",
  deleteExpense = "DELETE_EXPENSE",
  addIncome = "ADD_INCOME",
  deleteIncome = "DELETE_INCOME",
  addInvestment = "ADD_INVESTMENT",
  deleteInvestment = "DELETE_INVESTMENT",
}

export type DataActionType =
  | {
      type: DataActionTypes.updateUser;
      payload: {
        id: string;
        default_Currency: string;
        default_Timezone: string;
        expenses: ExpenseI[];
        income: IncomeI[];
        investments: InvestmentI[];
      };
    }
  | {
      type: DataActionTypes.updateSettings;
      payload: { default_Currency: string; default_Timezone: string };
    }
  | {
      type: DataActionTypes.addExpense;
      payload: ExpenseI;
    }
  | {
      type: DataActionTypes.deleteExpense;
      payload: string;
    }
  | {
      type: DataActionTypes.addIncome;
      payload: IncomeI;
    }
  | {
      type: DataActionTypes.deleteIncome;
      payload: string;
    }
  | {
      type: DataActionTypes.addInvestment;
      payload: InvestmentI;
    }
  | {
      type: DataActionTypes.deleteInvestment;
      payload: string;
    };
