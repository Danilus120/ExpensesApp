import { changeNamesToCapitalWithSpaces } from "utils/utils";

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

export { getDataHeaders };
