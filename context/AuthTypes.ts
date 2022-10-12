export interface UserI {
  uid: string;
  email: string;
  displayName: string;
}

interface ContextI {
  user: UserI | null;
  isLoading: boolean;
  handleChangeLoading: (value: boolean) => void;
  getUser: () => void;
}

export type { ContextI };
