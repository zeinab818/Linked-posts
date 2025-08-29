import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { sendRegisterData } from '../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../Schema/RegisterSchema';

export default function Register() {    
    
    
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null)

const {handleSubmit , register , formState:{errors , touchedFields}}= useForm({
        defaultValues:{
            name: "",
            email:"",
            password:"",
            rePassword:"",
            dateOfBirth:"",
            gender:"",
        },
        resolver:zodResolver(schema),
        mode:'onBlur',
        reValidateMode:'onBlur'
    });

    const navigate=useNavigate();
    async function signUp(userData){

        setLoading(true);
        const response= await sendRegisterData(userData);
        if(response.message){
            navigate('/login') 
        }
        else{
            setApiError(response.error)
        }
        setLoading(false);
        console.log(response);
            
    }
    return <>
    
            <div className="register dark:bg-gray-900 lg:w-1/2 md:w-2/3 sl:w-full mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl min-w-md">
                <h1 className='text-3xl mb-4'>Register Now</h1>
                <form onSubmit={handleSubmit(signUp)} className='flex flex-col gap-4'>
                    <Input isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message}
                    variant='bordered' type="text"
                    label="Name" {...register('name')}/>
                    
                    {/* {errors.name && <p>{errors.name?.message}</p> } */}
                    <Input  isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message}   variant='bordered' type="email" label="Email" {...register('email')}/>
                    <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message}   variant='bordered' type="password" label="Password" {...register('password')}/>
                    <Input  isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} errorMessage={errors.rePassword?.message} variant='bordered' type="password" label="RePassword" {...register('rePassword')}/>
                    <div className="flex gap-4"> 
                        <Input  isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} errorMessage={errors.dateOfBirth?.message}  variant='bordered' type="date" label="DateOfBirth" {...register('dateOfBirth')}/>
                        <Select  isInvalid={Boolean(errors.gender && touchedFields.gender)} errorMessage={errors.gender?.message} value={'gender'} variant='bordered' className="max-w-xs" label="Select your gender" {...register('gender')}>
                            <SelectItem key={'male'}>Male</SelectItem>
                            <SelectItem key={'female'}>FeMale</SelectItem>
                        </Select>
                    </div>
                    <Button className='dark:bg-gray-800' isLoading={loading} type='submit'>Register</Button>
                    <div>If you have already an account <Link to={'/login'} className='text-blue-900 dark:text-gray-400 text-xl'>Log In</Link></div>
                    
                    {apiError && <span className='text-center text-red-800'>{apiError}</span>}
                </form>
            </div>
    </>
}
