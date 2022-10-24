import LoadingComponent from "@/Atoms/Loading";
import { initialUserValues } from "@/constants/initialUserValues";
import { dataReducer } from "@/hooks/dataReducer";
import {
  getUsers,
  getUserFromFirebase,
  updateUserDB,
} from "lib/firebaseMethods";
import { useLayoutEffect, useRef } from "react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataActionTypes } from "types/dataReducer.interface";
import {
  ExpenseFormDataI,
  ExpenseI,
  IncomeI,
  UserFirebaseI,
} from "types/user.interface";

// import { getUser } from "utils/utils";
import { useAuth } from "./AuthContext";
import { UserDataContextI } from "./UserDataCtxTypes";

const UserDataContext = createContext<UserDataContextI>({} as UserDataContextI);

export const useData = () => useContext(UserDataContext);

interface UserDataContextProviderI {
  children: ReactNode;
}

export const UserDataContextProvider = ({
  children,
}: UserDataContextProviderI) => {
  const { user } = useAuth();

  // TODO: How to get initial data from DB for useReducer / How to not update DB with const initialValues
  // const initialValues = {
  //   id: user?.uid!,
  //   default_Currency: "PLN",
  //   default_Timezone: "1",
  //   expenses: [],
  //   income: [],
  //   investments: [],
  // };

  const [isLoading, setIsLoading] = useState(true);
  const [userData, dispatch] = useReducer(dataReducer, {} as UserFirebaseI);

  useEffect(() => {
    if (Object.keys(userData).length < 0) return;

    updateUserDB(user?.uid!, userData);
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (!user) return;

    updateDataFromUser(user.uid);
  }, []);

  const updateDataFromUser = async (uid: string) => {
    const userDataFromFirebase = await getUserFromFirebase(uid);

    if (!userDataFromFirebase) {
      setIsLoading(false);
      return;
    }

    dispatch({
      type: DataActionTypes.updateUser,
      payload: {
        id: uid,
        default_Currency: userDataFromFirebase.default_Currency,
        default_Timezone: userDataFromFirebase.default_Timezone,
        expenses: userDataFromFirebase.expenses,
        income: userDataFromFirebase.income,
        investments: userDataFromFirebase.investments,
      },
    });

    setIsLoading(false);
  };

  const updateSettings = (options: { currency: string; timezone: string }) => {
    dispatch({
      type: DataActionTypes.updateSettings,
      payload: {
        default_Currency: options.currency,
        default_Timezone: options.timezone,
      },
    });
  };

  const addExpense = (expense: ExpenseI) => {
    dispatch({
      type: DataActionTypes.addExpense,
      payload: expense,
    });
  };

  const addNewExpense = (expense: {
    category: string;
    currency: string;
    date: Date;
    description: string;
    price: string;
    shopName: string;
  }) => {
    dispatch({
      type: DataActionTypes.addExpense,
      payload: {
        ...expense,
        id: uuidv4(),
        date: expense.date.getTime(),
      },
    });
  };

  const deleteExpense = (id: string) => {
    dispatch({
      type: DataActionTypes.deleteExpense,
      payload: id,
    });
  };

  const updateExpense = (id: string, newExpense: ExpenseFormDataI) => {
    // Delete expense -> add new Expense

    const expenseFromState = userData.expenses.find(
      (expenseFromState) => expenseFromState.id === id
    );

    if (!expenseFromState) return;

    deleteExpense(id);
    addExpense({ id, ...newExpense });
  };

  const actions = {
    updateSettings,
    addExpense,
    addNewExpense,
    deleteExpense,
    updateExpense,
  };

  const values = {
    userData,
    dispatch,
    actions,
  };

  return (
    <UserDataContext.Provider value={values}>
      {isLoading ? <LoadingComponent color="#4E739E" /> : children}
    </UserDataContext.Provider>
  );
};
function uuidv4(): string {
  throw new Error("Function not implemented.");
}
