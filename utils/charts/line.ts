import { ExpenseI, IncomeI } from "types/user.interface";
import { sortDataByDays } from "./comparison";
import { generateLineData, getDataFromTimeRange } from "./utils";

const getLineMonthComparisonData = (
  expenses: ExpenseI[],
  incomes: IncomeI[]
) => {
  const timeDependenceExpenses = getDataFromTimeRange(expenses, "month");
  const timeDependenceIncomes = getDataFromTimeRange(incomes, "month");

  const arrayOfExpensesValuesSortedByMonths = sortDataByDays(
    timeDependenceExpenses
  );
  const arrayOfIncomeValuesSortedByMonths = sortDataByDays(
    timeDependenceIncomes
  );

  const data = generateLineData(
    arrayOfExpensesValuesSortedByMonths,
    arrayOfIncomeValuesSortedByMonths,
    "month"
  );

  return data;
};

export { getLineMonthComparisonData };
