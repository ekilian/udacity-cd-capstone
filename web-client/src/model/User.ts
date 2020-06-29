
export interface User {
  username:string,
  id:string,
  password?:string,
  given_name?:string,
  family_name?:string,
  email?:string,
  customrole?: string,
  customimageUrl?:string,
  enabled:boolean
}
