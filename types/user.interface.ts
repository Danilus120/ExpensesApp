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
  price: string;
  currency: string;
  description: string;
}

interface ExpenseFormDataI {
  date: Date;
  category: string;
  shopName: string;
  price: string;
  currency: string;
  description: string;
}

interface IncomeI {
  id: string;
  date: number;
  title: string;
  income: number;
  currency: string;
  description: string;
}

interface IncomeFormDataI {
  date: Date;
  title: string;
  income: string;
  currency: string;
  description: string;
}

interface InvestmentI {
  id: string;
  date: number;
  title: string;
  value: number;
  currency: string;
  description: string;
}

interface InvestmentFormDataI {
  date: Date;
  title: string;
  value: number;
  currency: string;
  description: string;
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
