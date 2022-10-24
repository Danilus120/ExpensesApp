import { useAuth } from "@/context/AuthContext";
import { initialUserValues } from "@/constants/initialUserValues";
import { DataActionType, DataActionTypes } from "types/dataReducer.interface";
import { UserFirebaseI } from "types/user.interface";

export const dataReducer = (
  state: UserFirebaseI = initialUserValues,
  action: DataActionType
) => {
  const { type } = action;

  switch (type) {
    case DataActionTypes.updateUser:
      return {
        ...state,
        default_Currency: action.payload.default_Currency,
        default_Timezone: action.payload.default_Timezone,
        expenses: action.payload.expenses,
        income: action.payload.income,
        investments: action.payload.investments,
      };
    case DataActionTypes.updateSettings:
      return {
        ...state,
        default_Currency: action.payload.default_Currency,
        default_Timezone: action.payload.default_Timezone,
      };
    case DataActionTypes.addExpense:
      const newExpensesAddProduct = [...state.expenses, action.payload];

      return {
        ...state,
        expenses: newExpensesAddProduct,
      };
    case DataActionTypes.deleteExpense:
      const newExpensesDeleteProduct = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );

      return {
        ...state,
        expenses: newExpensesDeleteProduct,
      };
    case DataActionTypes.addIncome:
      const newIncomeAddProduct = [...state.income, action.payload];

      return {
        ...state,
        income: newIncomeAddProduct,
      };
    case DataActionTypes.deleteIncome:
      const newIncomeDeleteProduct = state.income.filter(
        (income) => income.id !== action.payload
      );

      return {
        ...state,
        income: newIncomeDeleteProduct,
      };
    case DataActionTypes.addInvestment:
      const newInvestmentsAddProduct = [...state.investments, action.payload];

      return {
        ...state,
        investments: newInvestmentsAddProduct,
      };
    case DataActionTypes.deleteInvestment:
      const newInvestmentsDeleteProduct = state.investments.filter(
        (investment) => investment.id !== action.payload
      );

      return {
        ...state,
        investments: newInvestmentsDeleteProduct,
      };
    default:
      return {
        ...state,
      };
  }
};
