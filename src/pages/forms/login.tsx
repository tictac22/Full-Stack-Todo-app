
import React from "react";
import {Link,useNavigate} from "react-router-dom";

import {Box} from '../../components/forms/box';
import { Typography, Button } from "@mui/material";

import { useForm,SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {InputField} from "../../components/forms/inputField"
import { IFormLogin } from "../../interfaces";
import {schemaLogin} from "../../components/forms/yup"
import { AuthService } from './../../api/authService';
export const Login:React.FC = () => {
    const navigate = useNavigate()
    const {control, register, handleSubmit, formState: { errors },setError } = useForm<IFormLogin>({
        resolver: yupResolver(schemaLogin),
        mode:"all"
    });
    const onSubmit:SubmitHandler<IFormLogin> = async data => {
        const response = await AuthService.login(data.email,data.password)
        if(response?.data?.type === "formFields") {
            setError("email",{
                type: "email",
                message: response.data.message,
            })
            setError("password",{
                type: "password",
                message: response.data.message,
            })
        }
        else {
            navigate("/",{replace:true})
        }
    };
    return (
        <Box>
            <Typography component="h1">
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField label="Email" fieldName="email" autoComplete="email" control={control} register={register} errors={errors}/>
                <InputField type="password" label="Password" fieldName="password" autoComplete="current-password" control={control} register={register} errors={errors}/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
                    <Link to="/password">
                            <Typography sx={{marginRight:"20px",textAlign:"right",display:"block",textDecoration:"underline",color: "rgb(38 128 216)"}}>           
                                Forgot password?
                            </Typography>
                    </Link>
                    <Link to="/">
                            <Typography sx={{textAlign:"right",display:"block",textDecoration:"underline",color: "rgb(38 128 216)"}}>           
                                Don't have an account? Sign Up
                            </Typography>
                    </Link>
                </div>
                <Button sx={{marginTop:"15px",width:"100%"}}  type="submit" variant="contained">SIGN IN</Button>
            </form>
        </Box>
    )
}