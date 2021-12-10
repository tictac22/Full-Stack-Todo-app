
import React from "react"

import {Box as Wrapper} from '@mui/material';

interface Props {
    children:React.ReactNode
}
export const Box:React.FC<Props> = ({children}) => {
    return (
        <div className="form__wrapper">
            <Wrapper sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth:"800px"
                }}>
                {children}
            </Wrapper>
        </div>
    )
}