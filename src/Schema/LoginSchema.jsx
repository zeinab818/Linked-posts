import * as zod from 'zod'

export const schema=zod.object({
 
    email:zod.string().nonempty('Email Is Required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,'Email is InValid'),

    password:zod.string().nonempty('Password Is Required')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password is InValid'),
    
})
