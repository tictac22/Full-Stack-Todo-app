export interface IFormRegistration {
    name: string;
    email: string;
    password: string;
    confirmPassword:string
}
export interface IFormLogin {
    email:string;
    password:string
}
export interface IFormRecover{
    email:string
}



export interface IFolders {
    title:string,
    color:string,
    tasks:{text:string,isCompleted:boolean}[]
}