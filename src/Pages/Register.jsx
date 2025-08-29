import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { sendRegisterData } from '../Services/authServices';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../Schema/RegisterSchema';
import { addToast, ToastProvider } from "@heroui/react";

export default function Register() {    
    
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const [placement] = React.useState("top-center");

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

    const navigate = useNavigate();

    async function signUp(userData){
        setLoading(true);
        const response = await sendRegisterData(userData);

        if(response.message){
            addToast({
                title: "Registration Successful 🎉",
                description: "Your account has been created successfully",
                color: "success",
            });
            setTimeout(() => navigate('/login'), 1500);

        } else {

            setApiError(response.error);
            addToast({
                title: "Registration Failed ❌",
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

        <div className="register dark:bg-gray-900 w-full md:w-2/3 lg:w-1/2 max-w-md mx-auto bg-white py-10 px-6 rounded-2xl shadow-2xl">
            <h1 className="text-3xl mb-4">Register Now</h1>
            
            <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4">
                <Input 
                    isInvalid={Boolean(errors.name && touchedFields.name)} 
                    errorMessage={errors.name?.message}
                    variant="bordered" 
                    type="text"
                    label="Name" 
                    {...register('name')}
                />

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

                <Input  
                    isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} 
                    errorMessage={errors.rePassword?.message} 
                    variant="bordered" 
                    type="password" 
                    label="RePassword" 
                    {...register('rePassword')}
                />

                <div className="flex flex-col md:flex-row gap-4"> 
                    <Input  
                        isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} 
                        errorMessage={errors.dateOfBirth?.message}  
                        variant="bordered" 
                        type="date" 
                        label="DateOfBirth" 
                        {...register('dateOfBirth')}
                    />

                    <Select  
                        isInvalid={Boolean(errors.gender && touchedFields.gender)} 
                        errorMessage={errors.gender?.message} 
                        variant="bordered" 
                        className="w-full md:max-w-xs" 
                        label="Select your gender" 
                        {...register('gender')}
                    >
                        <SelectItem key="male">Male</SelectItem>
                        <SelectItem key="female">Female</SelectItem>
                    </Select>
                </div>

                <Button className="dark:bg-gray-800" isLoading={loading} type="submit">
                    Register
                </Button>

                <div>
                    If you have already an account 
                    <Link to="/login" className="text-blue-900 dark:text-gray-400 text-xl"> Log In</Link>
                </div>
                
                {apiError && <span className="text-center text-red-800">{apiError}</span>}
            </form>
        </div>
    </>
}
