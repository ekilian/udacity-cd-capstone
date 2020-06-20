
export interface User {
  username:string,
  given_name?:string,
  family_name?:string,
  address?:string,
  phone_number?:string,
  email?:string
  customrole?: string
}
