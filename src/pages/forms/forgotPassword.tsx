
import React,{useState} from "react"
import {Box} from "../../components/forms/box";

import {Button,Typography} from '@mui/material';

import { useForm,SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {schemaRecover} from "../../components/forms/yup"
import {InputField} from "../../components/forms/inputField"

import { IFormRecover } from "../../interfaces";
import { AuthService } from './../../api/authService';
import { useNavigate } from 'react-router-dom';

export const RecoverPassword:React.FC = () => {
    const [nextStep,setNextStep] = useState<boolean>(false)
    const navigate = useNavigate();
    const {control, register, handleSubmit, formState: { errors },setError } = useForm<IFormRecover>({
        resolver: yupResolver(schemaRecover),
        mode:"all"
    });
    const onSubmit:SubmitHandler<IFormRecover> = async data => {
        const {email,password} = data;
        try {
            await AuthService.forgotPassword({email,password});
            navigate("/login",{replace:true})
        }
        catch(e) {
            setError("email",{
                type: "manual",
                message: "Such email doesn't exist",
            })
        }
    };
    return (
        <Box>
            <Typography component="h1">
                    Recover your password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                    label="Email" 
                    fieldName="email" 
                    autoComplete="email" 
                    control={control} 
                    register={register} 
                    errors={errors}
                />
                <InputField
                    type="password" 
                    label="Password" 
                    fieldName="password" 
                    autoComplete="new-password" 
                    control={control} 
                    register={register} 
                    errors={errors}
                />
                <InputField 
                    type="password"
                    label="Confrim password" 
                    fieldName="confirmPassword" 
                    autoComplete="new-password"
                    control={control} 
                    register={register} 
                    errors={errors}
                />
                <Button sx={{marginTop:"15px",width:"100%"}}  type="submit" variant="contained">SIGN IN</Button>
            </form>
        </Box>
    )
}