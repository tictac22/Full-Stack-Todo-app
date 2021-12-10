
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

interface Props {
    label:string,
    fieldName:string,
    autoComplete:string,
    control: any,
    errors:any,
    register:any,
    type?:string
}

export const InputField:React.FC<Props> = memo(({label,fieldName,autoComplete,control,errors,register,type}) => {
    return (
        <Controller 
            defaultValue=""  
            name={fieldName}
            control={control} 
            render={()=> (
                <TextField
                    {...register(fieldName)}
                    error={!!errors?.[fieldName]?.message}
                    helperText={errors?.[fieldName]?.message}
                    margin="normal"
                    fullWidth
                    id={fieldName}
                    label={label}
                    name={fieldName}
                    type={type ?? "text"}
                    autoComplete={autoComplete}
                />
            )}
        />
    )
})