interface UserFirebaseI {
  id: string;
  default_Currency: string;
  default_Timezone: string;
  expenses: ExpenseI[];
  income: IncomeI[];
  investments: InvestmentI[];
  reminders: ReminderI[];
}

interface ExpenseI {
  id: string;
  date: number;
  category: string;
  shopName: string;
  value: number;
  description: string;
}

interface ExpenseFormDataI {
  date: Date;
  category: string;
  shopName: string;
  value: number;
  description: string;
}

interface IncomeI {
  id: string;
  date: number;
  category: string;
  title: string;
  value: number;
  description: string;
}

interface IncomeFormDataI {
  date: Date;
  category: string;
  title: string;
  value: number;
  description: string;
}

interface InvestmentI {
  id: string;
  date: number;
  name: string;
  value: number;
  exchangeRate: number;
  quantity: number;
  payoutValue: number;
  payoutDate: number;
  payoutExchangeRate: number;
  summary: number;
  withdrawn: boolean;
}

interface InvestmentFormDataI {
  date: Date;
  name: string;
  value: number;
  exchangeRate: number;
  quantity: number;
}

interface ReminderI {
  id: string;
  date: number;
  title: string;
  value: number;
  category: string;
  shopName: string;
  description: string;
  notified: boolean;
}

interface ReminderFormDataI {
  date: Date;
  title: string;
  value: number;
  description: string;
}

export type {
  UserFirebaseI,
  ExpenseI,
  IncomeI,
  InvestmentI,
  ReminderI,
  ExpenseFormDataI,
  IncomeFormDataI,
  InvestmentFormDataI,
  ReminderFormDataI,
};
