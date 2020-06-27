import { User } from "../../model/User";


export const validateUsername = (workers:User[], value:string):boolean => {
  let result:boolean = false;
  workers.forEach(element => {
    if(element.username === value) {
      result = true;
    }
  });
  return result;
}