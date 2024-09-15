import { Profiles } from "@prisma/client";

export interface UserDto {
    fullname:string;
    document:string;
    email:string;
    password:string;
    sale_point_id:number
    profile?: Profiles;
    is_active?:boolean
}

export interface UserDtoEdit {
    id: number;
    fullname?:string;
    document?:string;
    email?:string;
    sale_point_id?:number
    profile?: Profiles;
    is_active?:boolean
}