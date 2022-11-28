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
  ReminderFormDataI,
  ReminderI,
  UserFirebaseI,
} from "types/user.interface";
import { uuid } from "uuidv4";

import { useAuth } from "@/context/auth/AuthContext";
import { UserDataContextI } from "./UserDataCtxTypes";
import { changeDateIfRecursive } from "utils/reminders/utils";

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
        payoutValue: 0,
        payoutDate: 0,
        payoutExchangeRate: 0,
        summary: 0,
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

  const addReminder = (reminderFormData: ReminderFormDataI) => {
    const reminder = {
      ...reminderFormData,
      date: reminderFormData.date.getTime(),
      id: uuid(),
      category: "home-and-bills",
      shopName: "Bills - reminder",
      notified: false,
    };

    dispatch({
      type: DataActionTypes.addReminder,
      payload: reminder,
    });
  };

  const updateReminder = (id: string, reminder: ReminderI) => {
    const reminderFromState = userData.reminders.find(
      (reminder) => reminder.id === id
    );

    if (!reminderFromState) return;

    dispatch({
      type: DataActionTypes.updateReminder,
      payload: {
        id,
        reminder,
      },
    });
  };

  const deleteReminder = (id: string) => {
    dispatch({
      type: DataActionTypes.deleteReminder,
      payload: id,
    });
  };

  const addReminderExpense = (reminder: ReminderI) => {
    const expense = {
      category: reminder.category,
      date: reminder.date,
      description: reminder.description,
      id: uuid(),
      shopName: reminder.title,
      value: reminder.value,
    };

    // Add to expense
    dispatch({
      type: DataActionTypes.addExpense,
      payload: expense,
    });

    const newDismissReminder = changeDateIfRecursive(reminder);

    // Change notified or change to new date if recursive
    dispatch({
      type: DataActionTypes.dismissReminder,
      payload: newDismissReminder,
    });
  };

  const dismissReminder = (id: string) => {
    const reminder = userData.reminders.find((reminder) => reminder.id === id);

    if (!reminder) return;

    const newDismissReminder = changeDateIfRecursive(reminder);

    dispatch({
      type: DataActionTypes.dismissReminder,
      payload: newDismissReminder,
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
    addReminder,
    updateReminder,
    deleteReminder,
    addReminderExpense,
    dismissReminder,
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
