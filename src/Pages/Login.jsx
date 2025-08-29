import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { sendLoginData } from '../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../Schema/LoginSchema';
import { AuthContext } from '../Context/AuthContext';
import { addToast, ToastProvider } from "@heroui/react";

export default function Login() {    
    
    
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [placement] = React.useState("top-center");
    

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

    async function signIn(userData){

        setLoading(true);
        const response= await sendLoginData(userData);
        if(response.message){
            localStorage.setItem('token', response.token);
            setIsLoggedIn(true);
            addToast({
                title: "Login Successful 🎉",
                description: "You login successfully",
                color: "success",
            });
            setTimeout(() =>navigate('/') ,2000)
        }
        else{
            setApiError(response.error)
            addToast({
                title: "Login Failed ❌",
                description: response.error || "Something went wrong",
                color: "danger",
            });

        }
        setLoading(false);
        console.log(response);
            
    }
    return <>
          {/* ✅ ToastProvider لازم يكون ظاهر مرة واحدة فوق */}
                <div className="fixed z-[100]">
                    <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} />
                </div>
        <div className="login dark:bg-gray-900 w-full md:w-2/3 lg:w-1/2 max-w-md mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl">
            <h1 className="text-3xl mb-4 ">Login Now</h1>
            <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-4">
                <Input 
                isInvalid={Boolean(errors.email && touchedFields.email)} 
                errorMessage={errors.email?.message} 
                variant="bordered" 
                type="email" 
                label="Email" 
                {...register('email')} 
                />
                <Input 
                isInvalid={Boolean(errors.password && touchedFields.password)} 
                errorMessage={errors.password?.message} 
                variant="bordered" 
                type="password" 
                label="Password" 
                {...register('password')} 
                />
                
                <Button className="dark:bg-gray-800" isLoading={loading} type="submit">
                Login
                </Button>
                <div>
                If you don't have an account please, 
                <Link to="/register" className="text-blue-900 dark:text-gray-400 text-xl"> Sign Up</Link>
                </div>
                {apiError && <span className="text-center text-red-800">{apiError}</span>}
            </form>
    </div>

    </>
}
