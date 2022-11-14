import { expensesCategories, incomeCategories } from "@/constants/categories";

const toCapital = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const changeNamesToCapitalWithSpaces = (name: string) => {
  const splittedNames = name.split(/(?=[A-Z])/);

  const upperCaseNames = splittedNames.map((name) => {
    name.toLowerCase();
    return toCapital(name);
  });

  return upperCaseNames.join(" ");
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
  toCapital,
  changeNamesToCapitalWithSpaces,
  formatDate,
  getFilteredExpensesCategories,
  getFilteredIncomesCategories,
  checkIfChartDataIsNotEmpty,
};
