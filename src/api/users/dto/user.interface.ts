import { Profiles } from "@prisma/client";

export interface UserDto {
    id?: number;
    fullname:string;
    document:string;
    email:string;
    password?:string;
    salePointId:number
    profile?: Profiles;
    isActive?:boolean
}