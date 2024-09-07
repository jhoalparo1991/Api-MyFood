export interface UserI {
    fullname:string;
    type_doc:string;
    document:string;
    email:string;
    password:string;
    rol:string;
    is_active?:boolean
}

export interface UserEditInterface {
    fullname?:string;
    type_doc?:string;
    document?:string;
    email?:string;
    rol?:string;
    is_active?:boolean
}