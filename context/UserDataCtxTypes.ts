import { Dispatch } from "react";
import { DataActionType } from "types/dataReducer.interface";
import { UserFirebaseI } from "types/user.interface";

export interface UserI {
  uid: string;
  email: string;
  displayName: string;
}

interface UserDataContextI {
  userData: UserFirebaseI;
  dispatch: Dispatch<DataActionType>;
}

export type { UserDataContextI };
