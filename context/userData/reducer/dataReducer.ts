import { initialUserValues } from "@/constants/initialUserValues";
import {
  DataActionType,
  DataActionTypes,
} from "@/context/userData/reducer/dataReducer.interface";
import {
  ExpenseI,
  IncomeI,
  InvestmentI,
  ReminderI,
  UserFirebaseI,
} from "types/user.interface";

export const dataReducer = (
  state: UserFirebaseI = initialUserValues,
  action: DataActionType
) => {
  const { type, payload } = action;

  switch (type) {
    case DataActionTypes.updateUser:
      return {
        ...state,
        default_Currency: payload.default_Currency,
        default_Timezone: payload.default_Timezone,
        expenses: payload.expenses,
        income: payload.income,
        investments: payload.investments,
        reminders: payload.reminders,
      };
    case DataActionTypes.updateSettings:
      return {
        ...state,
        default_Timezone: payload.default_Timezone,
      };
    case DataActionTypes.updateCurrency:
      return {
        ...state,
        default_Currency: payload.default_Currency,
      };
    case DataActionTypes.addExpense:
      const newExpensesAddProduct = [...state.expenses, payload];

      return {
        ...state,
        expenses: newExpensesAddProduct,
      };
    case DataActionTypes.deleteExpense:
      const newExpensesDeleteProduct = state.expenses.filter(
        (expense) => expense.id !== payload
      );

      return {
        ...state,
        expenses: newExpensesDeleteProduct,
      };
    case DataActionTypes.updateExpense:
      const newExpense = {
        ...payload.expense,
        date: payload.expense.date.getTime(),
      };
      return {
        ...state,
        expenses: state.expenses.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ id: currEl.id, ...newExpense });
          return acc;
        }, [] as ExpenseI[]),
      };
    case DataActionTypes.addIncome:
      const newIncomeAddProduct = [...state.income, payload];

      return {
        ...state,
        income: newIncomeAddProduct,
      };
    case DataActionTypes.deleteIncome:
      const newIncomeDeleteProduct = state.income.filter(
        (income) => income.id !== payload
      );

      return {
        ...state,
        income: newIncomeDeleteProduct,
      };
    case DataActionTypes.updateIncome:
      const newIncome = {
        ...payload.income,
        date: payload.income.date.getTime(),
      };
      return {
        ...state,
        income: state.income.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ id: currEl.id, ...newIncome });
          return acc;
        }, [] as IncomeI[]),
      };
    case DataActionTypes.addInvestment:
      const newInvestmentsAddProduct = [...state.investments, payload];

      return {
        ...state,
        investments: newInvestmentsAddProduct,
      };
    case DataActionTypes.deleteInvestment:
      const newInvestmentsDeleteProduct = state.investments.filter(
        (investment) => investment.id !== payload
      );

      return {
        ...state,
        investments: newInvestmentsDeleteProduct,
      };
    case DataActionTypes.updateInvestment:
      return {
        ...state,
        investments: state.investments.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ ...currEl, ...payload.data });
          return acc;
        }, [] as InvestmentI[]),
      };
    case DataActionTypes.rollbackInvestment:
      return {
        ...state,
        investments: state.investments.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ ...currEl, withdrawn: false });
          return acc;
        }, [] as InvestmentI[]),
      };
    case DataActionTypes.addReminder:
      const newReminders = [...state.reminders, payload];

      return {
        ...state,
        reminders: newReminders,
      };
    case DataActionTypes.updateReminder:
      const newReminder = {
        ...payload.reminder,
        date: new Date(payload.reminder.date).getTime(),
      };

      return {
        ...state,
        reminders: state.reminders.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ ...newReminder });
          return acc;
        }, [] as ReminderI[]),
      };
    case DataActionTypes.deleteReminder:
      const newRemindersDelete = state.reminders.filter(
        (reminder) => reminder.id !== payload
      );

      return {
        ...state,
        reminders: newRemindersDelete,
      };
    case DataActionTypes.dismissReminder:
      return {
        ...state,
        reminders: state.reminders.reduce((acc, currEl) => {
          currEl.id !== payload.id
            ? acc.push(currEl)
            : acc.push({ ...payload });
          return acc;
        }, [] as ReminderI[]),
      };
    default:
      return {
        ...state,
      };
  }
};
