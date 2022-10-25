import LoadingComponent from "@/Atoms/Loading";
import { dataReducer } from "@/context/userData/reducer/dataReducer";
import { getUserFromFirebase, updateUserDB } from "lib/firebaseMethods";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataActionTypes } from "@/context/userData/reducer/dataReducer.interface";
import {
  ExpenseFormDataI,
  ExpenseI,
  IncomeI,
  UserFirebaseI,
} from "types/user.interface";
import { uuid } from "uuidv4";

import { useAuth } from "@/context/auth/AuthContext";
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

  const [isLoading, setIsLoading] = useState(true);
  const [userData, dispatch] = useReducer(dataReducer, {} as UserFirebaseI);

  useEffect(() => {
    if (Object.keys(userData).length < 0) return;

    updateUserDB(user?.uid!, userData);
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log("USER", user);
    if (!user) return;

    updateDataFromUser(user.uid);
  }, []);

  const updateDataFromUser = async (uid: string) => {
    try {
      const userDataFromFirebase = await getUserFromFirebase(uid);

      if (!userDataFromFirebase) {
        setIsLoading(false);
        return;
      }

      dispatch({
        type: DataActionTypes.updateUser,
        payload: {
          ...userDataFromFirebase,
          id: uid,
        },
      });

      setIsLoading(false);
    } catch (err) {
      console.log("firebaseErr", err);
      setIsLoading(false);
    }
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

  const addExpense = (expense: {
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
        id: uuid(),
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

  const updateExpense = (id: string, expense: ExpenseFormDataI) => {
    const expenseFromState = userData.expenses.find(
      (expenseFromState) => expenseFromState.id === id
    );

    if (!expenseFromState) return;

    dispatch({
      type: DataActionTypes.updateExpense,
      payload: {
        id,
        expense,
      },
    });
  };

  const addIncome = () => {};

  const deleteIncome = (id: string) => {};

  const updateIncome = () => {};

  const addInvestment = () => {};

  const deleteInvestment = (id: string) => {};

  const updateInvestment = () => {};

  const actions = {
    updateSettings,
    addExpense,
    deleteExpense,
    updateExpense,
    addIncome,
    deleteIncome,
    updateIncome,
    addInvestment,
    deleteInvestment,
    updateInvestment,
  };

  const values = {
    userData,
    actions,
  };

  return (
    <UserDataContext.Provider value={values}>
      {isLoading ? <LoadingComponent color="#4E739E" /> : children}
    </UserDataContext.Provider>
  );
};
