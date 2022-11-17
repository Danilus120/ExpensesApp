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
  IncomeFormDataI,
  IncomeI,
  InvestmentFormDataI,
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
  }, [userData]);

  useEffect(() => {
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
    } catch (err) {
      console.log(err);
    } finally {
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

  const addExpense = (expense: ExpenseFormDataI) => {
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

  const addIncome = (income: IncomeFormDataI) => {
    dispatch({
      type: DataActionTypes.addIncome,
      payload: {
        ...income,
        id: uuid(),
        date: income.date.getTime(),
      },
    });
  };

  const deleteIncome = (id: string) => {
    dispatch({
      type: DataActionTypes.deleteIncome,
      payload: id,
    });
  };

  const updateIncome = (id: string, income: IncomeFormDataI) => {
    const incomeFromState = userData.income.find(
      (incomeFromState) => incomeFromState.id === id
    );

    if (!incomeFromState) return;

    dispatch({
      type: DataActionTypes.updateIncome,
      payload: {
        id,
        income,
      },
    });
  };

  const addInvestment = (investment: InvestmentFormDataI) => {
    dispatch({
      type: DataActionTypes.addInvestment,
      payload: {
        ...investment,
        id: uuid(),
        date: investment.date.getTime(),
        payoutValue: null,
        payoutDate: null,
        payoutExchangeRate: null,
        summary: null,
        withdrawn: false,
      },
    });
  };

  const deleteInvestment = (id: string) => {
    dispatch({
      type: DataActionTypes.deleteInvestment,
      payload: id,
    });
  };

  const updateInvestment = (
    id: string,
    data: {
      payoutValue: number;
      payoutDate: number;
      payoutExchangeRate: number;
      summary: number;
      withdrawn: boolean;
    }
  ) => {
    const investmentFromState = userData.investments.find(
      (investmentFromState) => investmentFromState.id === id
    );

    if (!investmentFromState) return;

    dispatch({
      type: DataActionTypes.updateInvestment,
      payload: {
        id,
        data,
      },
    });
  };

  const rollbackInvestment = (id: string) => {
    dispatch({
      type: DataActionTypes.rollbackInvestment,
      payload: {
        id,
      },
    });
  };

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
    rollbackInvestment,
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
