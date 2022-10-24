import LoadingComponent from "@/Atoms/Loading";
import { initialUserValues } from "@/constants/initialUserValues";
import { dataReducer } from "@/hooks/dataReducer";
import { updateUserDB } from "lib/firebaseMethods";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { DataActionTypes } from "types/dataReducer.interface";
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
  const [userData, dispatch] = useReducer(dataReducer, initialUserValues);

  useEffect(() => {
    if (!user) return;
    updateDataFromUser(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    console.log(userData);

    // TODO: Is that properly? -> Update whole user in DB after update state
    updateUserDB(user.uid, userData);
  }, [user, userData]);

  const updateDataFromUser = async (authUser: UserI) => {
    const user = await getUser(authUser.uid);

    if (user) {
      dispatch({
        type: DataActionTypes.updateUser,
        payload: {
          id: user.id,
          default_Currency: user.default_Currency,
          default_Timezone: user.default_Timezone,
          expenses: user.expenses,
          income: user.income,
          investments: user.investments,
        },
      });
    }

    setIsLoading(false);
  };

  const values = {
    userData,
    dispatch,
    // defaultSettings,
    // expenses,
    // income,
    // investments,
  };

  return (
    <UserDataContext.Provider value={values}>
      {isLoading ? <LoadingComponent color="#4E739E" /> : children}
    </UserDataContext.Provider>
  );
};
