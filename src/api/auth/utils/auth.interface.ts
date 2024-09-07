export interface LoginInterface {
    email: string;
    password: string;
}

export interface UserPayload{
    id:any,
    email: string;
    role:string
}


export interface UserUpdatePassword {
    password: string;
    repetPassword: string;
}