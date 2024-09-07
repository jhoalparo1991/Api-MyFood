import bcrypt from 'bcrypt'

export const passwordHash  = async (password:string)=>{
    return await bcrypt.hash(password,10);
};

export const passwordCompare  = async (password:string, passwordHash:string)=>{
    return await bcrypt.compare(password,passwordHash);
};