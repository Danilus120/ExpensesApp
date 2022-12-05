import {
  ExpenseFormDataI,
  IncomeFormDataI,
  InvestmentFormDataI,
  ReminderFormDataI,
  ReminderI,
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
    updateSettings: (options: { timezone: string }) => void;
    updateCurrency: (currency: string) => void;
    addExpense: (expense: ExpenseFormDataI) => void;
    deleteExpense: (id: string) => void;
    updateExpense: (id: string, newExpense: ExpenseFormDataI) => void;
    addIncome: (income: IncomeFormDataI) => void;
    deleteIncome: (id: string) => void;
    updateIncome: (id: string, newIncome: IncomeFormDataI) => void;
    addInvestment: (investment: InvestmentFormDataI) => void;
    deleteInvestment: (id: string) => void;
    updateInvestment: (
      id: string,
      data: {
        payoutValue: number;
        payoutDate: number;
        payoutExchangeRate: number;
        summary: number;
        withdrawn: boolean;
      }
    ) => void;
    rollbackInvestment: (id: string) => void;
    addReminder: (reminderFormData: ReminderFormDataI) => void;
    updateReminder: (id: string, reminder: ReminderI) => void;
    deleteReminder: (id: string) => void;
    addReminderExpense: (reminder: ReminderI) => void;
    dismissReminder: (id: string) => void;
  };
}

export type { UserDataContextI };
