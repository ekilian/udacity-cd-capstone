import { useContext, createContext, Dispatch, SetStateAction } from "react";


export interface IAuthContext {
  isAuthenticated: boolean,
  isOffice: boolean,
  setIsAuthenticated:Dispatch<SetStateAction<boolean>>
  setIsOffice:Dispatch<SetStateAction<boolean>>
}

export const Context = createContext({} as IAuthContext);

export function useAuthContext() {
  return useContext(Context);
}
