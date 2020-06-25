import { useContext, createContext, Dispatch, SetStateAction } from "react";


export interface IAuthContext {
  isAuthenticated: boolean,
  setIsAuthenticated:Dispatch<SetStateAction<boolean>>
}

export const Context = createContext({} as IAuthContext);

export function useAuthContext() {
  return useContext(Context);
}
