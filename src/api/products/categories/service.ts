import category from './model';
import { ICreateCategory } from './utils/category.interface';

export const getAll = ()=>{
    return category.find();
}

export const getById = (id:string)=>{
    return category.findById({_id:id}).exec();
}

export const getBySlug = (slug:string)=>{
    return category.findOne({slug}).exec();
}

export const countCategories = ()=>{
    return category.find().countDocuments();
}

export const createCategory = (data:ICreateCategory)=>{
    return category.create(data);
}

export const updateCategory = (data:ICreateCategory, id:string)=>{
    return category.findByIdAndUpdate({_id:id},data,{
        returnDocument: 'after'
    });
}

export const deleteCategory = (id:string)=>{
    return category.findByIdAndUpdate({_id:id},{is_active:false, visible_pv:false});
}

