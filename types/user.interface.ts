interface UserFirebaseI {
  id: string;
  default_Currency: string;
  default_Timezone: string;
  expenses: ExpenseI[];
  income: IncomeI[];
  investments: InvestmentI[];
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
}

interface InvestmentFormDataI {
  date: Date;
  name: string;
  value: number;
  exchangeRate: number;
  quantity: number;
}

export type {
  UserFirebaseI,
  ExpenseI,
  IncomeI,
  InvestmentI,
  ExpenseFormDataI,
  IncomeFormDataI,
  InvestmentFormDataI,
};
