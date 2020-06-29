import { Auth } from "aws-amplify"

export const isAuthenticated = async ():Promise<boolean> => {
  return (await Auth.currentSession()).isValid();
}

export const requireAuth = async (nextState:any, replace:any , next:any):Promise<void> => {
  const isValid = (await Auth.currentSession()).isValid();
  if (!isValid) {
    replace({
      pathname: "/login",
    });
  }
  next();
}
