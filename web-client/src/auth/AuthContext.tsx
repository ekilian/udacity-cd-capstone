import { useContext, createContext, Dispatch, SetStateAction } from "react";


export interface IAuthContext {
  isAuthenticated: boolean,
  setIsAuthenticated:Dispatch<SetStateAction<boolean>>
}

export interface ICognitoAuth {
  authData:any,
  setAuthData:Dispatch<SetStateAction<ICognitoAuth>>
}

export const Context = createContext({} as IAuthContext);

export function useAuthContext() {
  return useContext(Context);
}

export const CognitoContext = createContext({} as ICognitoAuth);

export function useCognitoContext() {
  return useContext(CognitoContext);
}