import { getUsers } from "lib/firebaseMethods";
import { UserFirebaseI } from "types/user.interface";

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

// const getUser = async (uid: string) => {
//   const userData = await getUsers();

//   const res = await Promise.all(userData);

//   const user = res.find((el) => {
//     console.log(el, uid);
//     return el.id === uid;
//   });

//   console.log(user, uid);

//   return user as UserFirebaseI;
// };

export { getDataHeaders, isUserInDB, formatDate };
