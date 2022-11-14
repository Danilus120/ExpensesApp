import { ExpenseI, IncomeI } from "types/user.interface";
import { getDataFromTimePeriod } from "utils/timeFunctions";
import { sortDataByDays } from "../Bar/comparison";
import { generateLineData } from "../generateChartsData";

const getLineMonthComparisonData = (
  expenses: ExpenseI[],
  incomes: IncomeI[],
  chosenDate: Date | number = new Date()
) => {
  const timeDependenceExpenses = getDataFromTimePeriod(
    expenses,
    "month",
    chosenDate
  );
  const timeDependenceIncomes = getDataFromTimePeriod(
    incomes,
    "month",
    chosenDate
  );

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
