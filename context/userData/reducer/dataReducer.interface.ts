import {
  ExpenseFormDataI,
  ExpenseI,
  IncomeFormDataI,
  IncomeI,
  InvestmentFormDataI,
  InvestmentI,
} from "../../../types/user.interface";

export enum DataActionTypes {
  updateUser = "UPDATE_USER",
  updateSettings = "UPDATE_SETTINGS",
  addExpense = "ADD_EXPENSE",
  deleteExpense = "DELETE_EXPENSE",
  updateExpense = "UPDATE_EXPENSE",
  addIncome = "ADD_INCOME",
  deleteIncome = "DELETE_INCOME",
  updateIncome = "UPDATE_INCOME",
  addInvestment = "ADD_INVESTMENT",
  deleteInvestment = "DELETE_INVESTMENT",
  updateInvestment = "UPDATE_INVESTMENT",
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
      type: DataActionTypes.updateExpense;
      payload: {
        id: string;
        expense: ExpenseFormDataI;
      };
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
      type: DataActionTypes.updateIncome;
      payload: {
        id: string;
        income: IncomeFormDataI;
      };
    }
  | {
      type: DataActionTypes.addInvestment;
      payload: InvestmentI;
    }
  | {
      type: DataActionTypes.deleteInvestment;
      payload: string;
    }
  | {
      type: DataActionTypes.updateInvestment;
      payload: {
        id: string;
        data: {
          payoutValue: number;
          payoutDate: number;
          payoutExchangeRate: number;
          summary: number;
        };
      };
    };
