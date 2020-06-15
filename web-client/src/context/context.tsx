import { useContext, createContext, Dispatch, SetStateAction } from "react";


export interface IAuthContext {
  isAuthenticated: boolean,
  userHasAuthenticated:Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext(null as unknown as IAuthContext);

export function useAppContext() {
  return useContext(AppContext);
}