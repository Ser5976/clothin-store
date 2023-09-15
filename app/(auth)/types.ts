export interface IRegistration {
  name?: string;
  email: string;
  password: string;
}
export interface IResponseRegistration {
  message: string;
}
export interface ILogin {
  email: string;
  password: string;
}
