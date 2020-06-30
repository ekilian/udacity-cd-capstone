import { User } from "../../model/User";


export const validateUsername = (workers:User[], value:string):boolean => {
  let result:boolean = true;
  workers.forEach(element => {
    if(element.username === value) {
      result = false;
    }
  });
  return result;
}


export const validatePassword = (value:string | undefined):boolean => {
  let regExpPassword:RegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+=.@\[\]#\$%\^&\*])(?=.{8,})"); ///. [ ] { } ( ) ? " / \ , > < ' : ; | _ ~ `
  return value ? regExpPassword.test(value) : false;
}