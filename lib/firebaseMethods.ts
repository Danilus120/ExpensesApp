import { doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { isUserInDB } from "utils/utils";

import { databaseUserRef, db } from "@/config/firebase.config";

import { ExpenseI, IncomeI, UserFirebaseI } from "../types/user.interface";

import { initialUserValues } from "@/constants/initialUserValues";

const createUserDoc = async (uid: string) => {
  try {
    const isInDB = await isUserInDB(uid);

    if (isInDB) return;

    await setDoc(doc(db, "users", uid), initialUserValues);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getUsers = async () => {
  try {
    const response = await getDocs(databaseUserRef);

    const users = response.docs.map((data) => {
      const userList = data.data();
      const id = data.id;

      return {
        id: id,
        ...userList,
      } as UserFirebaseI;
    });

    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const updateSettings = async (
  uid: string,
  { currency, timezone }: { currency: string; timezone: string }
) => {
  await updateDoc(doc(db, "users", uid), {
    default_Currency: currency,
    default_Timezone: timezone,
  });
};

const updateExpenses = async (uid: string, expenses: ExpenseI[]) => {
  await updateDoc(doc(db, "users", uid), {
    expenses,
  });
};

const updateIncome = async (docID: string, income: IncomeI[]) => {
  await updateDoc(doc(db, "users", docID), {
    income,
  });
};

const updateInvestments = async (docID: string, investments: any[]) => {
  await updateDoc(doc(db, "users", docID), {
    investments,
  });
};

export {
  createUserDoc,
  getUsers,
  updateSettings,
  updateExpenses,
  updateIncome,
  updateInvestments,
};
