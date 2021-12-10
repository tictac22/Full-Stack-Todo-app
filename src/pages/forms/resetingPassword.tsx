
import React,{useEffect} from "react"
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRecoverPassword } from './../../components/forms/yup';
import {InputField} from "../../components/forms/inputField"

import {Box} from "../../components/forms/box";
import { Typography,Button } from "@mui/material";
import { AuthService } from './../../api/authService';
import { useNavigate } from 'react-router-dom';

export const ResettingPassword:React.FC = () => {
    const {token} = useParams();
    const navigate = useNavigate()
    const {control, register, handleSubmit, formState: { errors },setError } = useForm({
        resolver: yupResolver(schemaRecoverPassword),
        mode:"all"
    });
    useEffect(()=>{
        const validate = async () => {
            const accessToken:{isValid:boolean} = await AuthService.validateToken(token);
            if(!accessToken.isValid) return navigate("/login",{replace:true})
        }
        validate()
    },[])
    const onSubmit = async data => {
        try {
            await AuthService.setNewPassword(token,data.password)
        }
        catch(e) {

        }
    }
    return (
        <div>
            <Box>
                <Typography component="h1">
                    Setting new password
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Button sx={{marginTop:"15px",width:"100%"}}  type="submit" variant="contained">Confirm</Button>
                </form>
            </Box>
        </div>
    )
}