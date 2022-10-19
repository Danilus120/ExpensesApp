import { getUsers } from "lib/firebaseMethods";

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

const getUser = async (uid: string) => {
  const userData = await getUsers();

  const res = await Promise.all(userData);

  const user = res.find((el) => el.id === uid);

  return user;
};

export { getDataHeaders, isUserInDB, getUser };
