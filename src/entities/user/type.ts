export interface User {
  id: number;
  authUid: string | null;
  login: string;
  initialBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  login: string;
  password: string;
}

export interface Balance {
  initialBalance: number;
  income: number;
  expense: number;
  deferred: number;
  value: number;
}
