import { doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { isUserInDB } from "utils/utils";

import { databaseUserRef, db } from "@/config/firebase.config";

import { ExpenseI, IncomeI, UserFirebaseI } from "../types/user.interface";

const createUserDoc = async (uid: string) => {
  const isInDB = await isUserInDB(uid);

  if (isInDB) return;

  await setDoc(doc(db, "users", uid), {
    default_Currency: "PLN",
    default_Timezone: "+1",
    expenses: [],
    income: [],
    investments: [],
  });
};

const getUsers = async () => {
  try {
    const response = await getDocs(databaseUserRef);

    const users = response.docs.map(async (data) => {
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
  {
    default_Currency,
    default_Timezone,
  }: { default_Currency: string; default_Timezone: string }
) => {
  await updateDoc(doc(db, "users", uid), {
    default_Currency,
    default_Timezone,
  });
};

const updateExpenses = async (uid: string, expenses: ExpenseI[]) => {
  await updateDoc(doc(db, "users", uid), {
    expenses,
  });
};

const updateIncome = async (docID: string, income: IncomeI[]) => {
  await updateDoc(doc(db, "user", docID), {
    income,
  });
};

const updateInvestments = async (docID: string, investments: any[]) => {
  await updateDoc(doc(db, "user", docID), {
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
