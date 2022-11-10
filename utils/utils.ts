import { expensesCategories, incomeCategories } from "@/constants/categories";
import { isSameMonth } from "date-fns";
import { getUsers } from "lib/firebaseMethods";
import { ChartsDataI } from "types/chart.interface";
import { ExpenseI, IncomeI } from "types/user.interface";

interface ExpensesI {
  date: number;
  category: string;
  price: number;
  currency: string;
  description: string;
  shopName: string;
}

const getDataHeaders = (data: Array<ExpensesI>) => {
  const headers = getUniqueHeaders(data);

  return headers.map((header) => {
    return {
      Header: changeNamesToCapitalWithSpaces(header),
      accessor: header,
    };
  });
};

const getUniqueHeaders = (data: Array<ExpensesI>) => {
  const allHeaders = data.reduce((acc: string[], currItem) => {
    Object.keys(currItem).forEach((item) => {
      acc.push(item);
    });

    return acc;
  }, []);

  return Array.from(new Set(allHeaders));
};

const changeNamesToCapitalWithSpaces = (name: string) => {
  const splittedNames = name.split(/(?=[A-Z])/);

  const upperCaseNames = splittedNames.map((name) => {
    name.toLowerCase();
    return toCapital(name);
  });

  return upperCaseNames.join(" ");
};

const toCapital = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const isUserInDB = async (uid: string) => {
  const userData = await getUsers();

  const res = await Promise.all(userData);

  const haveUserDoc = res.some((el) => el.id === uid);

  return haveUserDoc;
};

function formatDate(date: string | number) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const getValueOfExpensesInActualMonth = (expenses: ExpenseI[]) => {
  const expensesFromMonth = getAllExpensesFromActualMonth(expenses);

  const value = expensesFromMonth.reduce((acc, expense) => {
    acc += Number(expense.value);
    return acc;
  }, 0);

  return value;
};

const getAllExpensesFromActualMonth = (expenses: ExpenseI[]) => {
  const expensesFromMonth = expenses.filter((expense) =>
    isSameMonth(expense.date, new Date())
  );

  return expensesFromMonth;
};

const getValueOfIncomesInActualMonth = (incomes: IncomeI[]) => {
  const incomesFromMonth = getAllIncomeFromActualMonth(incomes);

  const value = incomesFromMonth.reduce((acc, income) => {
    acc += Number(income.value);
    return acc;
  }, 0);

  return value;
};

const getAllIncomeFromActualMonth = (incomes: IncomeI[]) => {
  const incomesFromMonth = incomes.filter((income) =>
    isSameMonth(income.date, new Date())
  );

  return incomesFromMonth;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getFilteredExpensesCategories = () => {
  const filteredCategories = expensesCategories.filter(
    (category) => category.allowedInSelect
  );

  return filteredCategories;
};

const getFilteredIncomesCategories = () => {
  const filteredCategories = incomeCategories.filter(
    (category) => category.allowedInSelect
  );

  return filteredCategories;
};

const checkIfChartDataIsNotEmpty = (chartData: any) => {
  return chartData.datasets[0].data.some((number: number) => number != 0);
};

export {
  getDataHeaders,
  isUserInDB,
  formatDate,
  getValueOfExpensesInActualMonth,
  getValueOfIncomesInActualMonth,
  getAllIncomeFromActualMonth,
  getAllExpensesFromActualMonth,
  capitalizeFirstLetter,
  getFilteredExpensesCategories,
  getFilteredIncomesCategories,
  checkIfChartDataIsNotEmpty,
};
