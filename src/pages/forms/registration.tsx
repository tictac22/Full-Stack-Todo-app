
import React, {useState} from "react"
import {Link} from "react-router-dom"

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useForm,SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { IFormRegistration } from "../../interfaces";

import {Box} from "../../components/forms/box"
import { schemaRegistration } from "../../components/forms/yup";
import { InputField } from "../../components/forms/inputField";
import { AuthService } from './../../api/authService';
import { setData } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/store";

export const Registration:React.FC = ()=> {
    const dispatch = useAppDispatch();
    const [checkEmail,setCheckEmail] = useState<boolean>(false)
    const {control, register, handleSubmit, setError, formState: { errors } } = useForm<IFormRegistration>({
        resolver: yupResolver(schemaRegistration),
        mode:"all"
    });
    const onSubmit:SubmitHandler<IFormRegistration> = async datas => {
        const result =  await AuthService.registration(datas.name,datas.email,datas.password);
        if(result?.type && result?.type === "email") {
            return setError("email",{
                type:"test",
                message:result.message
            })
        }
        setCheckEmail(!checkEmail)
        dispatch(setData({...result.user}))
    };
    
    return (
            <Box>
                {checkEmail ?  <div>To activate your account, please check your email</div> :
                <>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField label="Your name" fieldName="name" autoComplete="username" control={control} register={register} errors={errors}/>
                        <InputField label="Your email" fieldName="email" autoComplete="email" control={control} register={register} errors={errors}/>
                        <InputField type="password" label="Password" fieldName="password" autoComplete="new-password" control={control} register={register} errors={errors}/>
                        <InputField type="password" label="Confrim password" fieldName="confirmPassword" autoComplete="new-password" control={control} register={register} errors={errors}/>
                        <Link to="/login">
                            <Typography sx={{textAlign:"right",display:"block",textDecoration:"underline",color: "rgb(38 128 216)"}}>
                                Already have an account? Sign in
                            </Typography>
                        </Link>
                        <Button  sx={{marginTop:"15px",width:"100%"}}  type="submit" variant="contained">SIGN UP</Button>
                    </form>
                </>
                }
            </Box>
    );
}
