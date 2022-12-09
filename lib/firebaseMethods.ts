import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { isUserInDB } from "utils/user/userUtils";

import { databaseUserRef, db } from "@/config/firebase.config";

import { UserFirebaseI } from "../types/user.interface";

import { initialUserValues } from "@/constants/initialUserValues";

const createUserDoc = async (uid: string) => {
  try {
    const isInDB = await isUserInDB(uid);

    if (isInDB) return;

    const res = await setDoc(doc(db, "users", uid), {
      ...initialUserValues,
      id: uid,
    });

    return res;
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
      const { id } = data;

      return {
        id,
        ...userList,
      };
    });

    return users as UserFirebaseI[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getUserFromFirebase = async (uid: string) => {
  try {
    // const isInDB = await isUserInDB(uid);
    const response = await getDoc(doc(db, "users", uid));

    const data = response.data();

    return data as UserFirebaseI;
  } catch (err) {
    console.error(err);
  }
};

const updateUserDB = async (uid: string, userData: UserFirebaseI) => {
  await updateDoc(doc(db, "users", uid), { ...userData });
};

const deleteUserDB = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
};

export {
  createUserDoc,
  getUsers,
  getUserFromFirebase,
  updateUserDB,
  deleteUserDB,
};
