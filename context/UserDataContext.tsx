import LoadingComponent from "@/Atoms/Loading";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ExpenseI, IncomeI } from "types/user.interface";

import { getUser } from "utils/utils";
import { useAuth } from "./AuthContext";
import { UserI } from "./AuthTypes";
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
  const [defaultSettings, setDefaultSettings] = useState({
    default_Currency: "",
    default_Timezone: "",
  });
  const [expenses, setExpenses] = useState<Array<ExpenseI>>([]);
  const [income, setIncome] = useState<Array<IncomeI>>([]);
  const [investments, setInvestments] = useState<Array<any>>([]);

  useEffect(() => {
    updateDataFromUser(user);
  }, [user]);

  const updateDataFromUser = async (authUser: UserI | null) => {
    if (!authUser) return;

    const user = await getUser(authUser.uid);

    if (!user) return;
    setDefaultSettings({
      default_Currency: user.default_Currency,
      default_Timezone: user.default_Timezone,
    });
    setExpenses(user.expenses);
    setIncome(user.income);
    setInvestments(user.investments);

    setIsLoading(false);
  };

  const values = {
    defaultSettings,
    expenses,
    income,
    investments,
  };

  return (
    <UserDataContext.Provider value={values}>
      {isLoading ? <LoadingComponent color="#4E739E" /> : children}
    </UserDataContext.Provider>
  );
};
