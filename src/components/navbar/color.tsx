
import React, {memo} from "react"
import { styled } from '@mui/system';
interface Props {
    color:string,
    setColor(currentColor:string):void,
    isActive:string
}
export const Color:React.FC<Props> = memo(({color,setColor,isActive}) => {
    const isCurrent = color === isActive ?? false;
    return(
        <Div onClick={()=>{setColor(color)}} sx={{border:`${isCurrent ? "3px solid #525252" : "none"}`,backgroundColor:`${color}`}}>
        </Div>

    )
})
const Div = styled("div")({
    width:"20px",
    height:"20px",
    borderRadius:"50%"
});