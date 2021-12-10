
import React,{useState} from "react"
import {Box} from "../../components/forms/box";

import {Button,Typography} from '@mui/material';

import { useForm,SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {schemaRecover} from "../../components/forms/yup"
import {InputField} from "../../components/forms/inputField"

import { IFormRecover } from "../../interfaces";
import { AuthService } from './../../api/authService';

export const RecoverPassword:React.FC = () => {
    const [nextStep,setNextStep] = useState<boolean>(false)
    const {control, register, handleSubmit, formState: { errors },setError } = useForm<IFormRecover>({
        resolver: yupResolver(schemaRecover),
        mode:"all"
    });
    const onSubmit:SubmitHandler<IFormRecover> = async data => {
        try {
            await AuthService.forgotPassword(data.email);
            setNextStep(true)
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
            {nextStep ? "Check your email" : 
                <> 
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
                        <Button sx={{marginTop:"15px",width:"100%"}}  type="submit" variant="contained">SIGN IN</Button>
                    </form>
                </>
            }
        </Box>
    )
}