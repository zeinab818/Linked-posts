
import * as zod from 'zod'

export const schema=zod.object({
    name: zod.string().nonempty('Name Is Required')
        .min(3 ,  'Name must be at least 3 characteres')
        .max(10 , 'Name must be at most 10 characteres'),
    
    email:zod.string().nonempty('Email Is Required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,'Email is InValid'),

    password:zod.string().nonempty('Password Is Required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password is InValid'),
    
    rePassword:zod.string().nonempty('RePassword Is Required'),
    gender:zod.coerce.string().nonempty('Gender Is Required'),
    dateOfBirth:zod.coerce.date({required_error: 'Date of Birth is required'}).refine((value)=>{
        const userAge=value.getFullYear();
        const now = new Date().getFullYear();
        const average=now-userAge;
        return average>=18
    
    },'User Age must be bigger than 18')



}).refine((data)=> data.password===data.rePassword,{path:['rePassword'], message:"Passsword and RePassword don't match "})
