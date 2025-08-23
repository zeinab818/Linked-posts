import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { sendLoginData } from '../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../Schema/LoginSchema';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {    
    
    
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null)

const {handleSubmit , register , formState:{errors , touchedFields}}= useForm({
        defaultValues:{
            email:"",
            password:"",
        },
        resolver:zodResolver(schema),
        mode:'onBlur',
        reValidateMode:'onBlur'
    });

    const navigate=useNavigate();
    const {setIsLoggedIn}=useContext(AuthContext);

    async function signUp(userData){

        setLoading(true);
        const response= await sendLoginData(userData);
        if(response.message){
            localStorage.setItem('token', response.token);
            setIsLoggedIn(true);
            navigate('/') 
        }
        else{
            setApiError(response.error)

        }
        setLoading(false);
        console.log(response);
            
    }
    return <>
    
            <div className="login lg:w-1/2 md:w-2/3 sl:w-full mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl min-w-md">
                <h1 className='text-3xl mb-4'>Login Now</h1>
                <form onSubmit={handleSubmit(signUp)} className='flex flex-col gap-4'>
                    <Input  isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message}   variant='bordered' type="email" label="Email" {...register('email')}/>
                    <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message}   variant='bordered' type="password" label="Password" {...register('password')}/>
                    
                    <Button isLoading={loading} type='submit'>Login</Button>
                    <div>If you haven't an account please , <Link to={'/register'} className='text-blue-900'>Sign Up</Link></div>
                    {apiError && <span className='text-center text-red-800'>{apiError}</span>}
                </form>
            </div>
    </>
}
