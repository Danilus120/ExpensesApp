import { changeNamesToCapitalWithSpaces } from "utils/utils";

interface ExpenseFormDataI {
  date: Date;
  category: string;
  shopName: string;
  value: number;
  description: string;
}

const getDataHeaders = (data: Array<ExpenseFormDataI>) => {
  const headers = getUniqueHeaders(data);

  return headers.map((header) => {
    return {
      Header: changeNamesToCapitalWithSpaces(header),
      accessor: header,
    };
  });
};

const getUniqueHeaders = (data: Array<ExpenseFormDataI>) => {
  const allHeaders = data.reduce((acc: string[], currItem) => {
    Object.keys(currItem).forEach((item) => {
      acc.push(item);
    });

    return acc;
  }, []);

  return Array.from(new Set(allHeaders));
};

export { getDataHeaders };
