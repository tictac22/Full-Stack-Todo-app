
import React, {useRef, useState,useEffect, memo, useMemo} from "react"
import {Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { styled } from '@mui/system';
import { useMutation, useQueryClient } from "react-query";
import { MethodsService } from './../../api/methodsService';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setTodo } from "../../redux/todoSlice";

interface Props {
    color:string,
    isAll:boolean,
    title:string
}
export const TodoTitle:React.FC<Props> = memo(({title,color,isAll}) => {
    const dispatch = useAppDispatch()

    const [isEditable,setIsEditable] = useState(false);
    const toggleEditable = ():void => setIsEditable(!isEditable);
    
    const ref = useRef(null);
    const prevValue = useMemo(()=>ref?.current && ref.current.innerText,[isEditable]);
    
    const queryClient = useQueryClient()
    const mutation = useMutation(["changeTitle",prevValue],
    (currentValue:string)=>MethodsService.changeTitle(prevValue,currentValue),{
        onSuccess: ({data}) => {
            queryClient.setQueryData(['folder'], data.tasks)
            dispatch(setTodo({todo:data.currentValue}))
        },
        onError: () => {
            toggleEditable()
            ref.current.innerText  = prevValue
        }
    })
    const changeTitle = ():void => {
        const currentValue = ref.current.innerText;
        if(prevValue === currentValue ) return  toggleEditable();
        if(!currentValue || currentValue.length > 30) {
            ref.current.innerText = prevValue;
            return toggleEditable()
        }
        mutation.mutate(currentValue);
    }
    useEffect(()=>{
        ref && setEndOfContenteditable(ref.current)
    },[isEditable])
    return (
        <Title>
            <Typography sx={{display:"flex",alignItems:"center"}} component="h2"  >
                <DivTitle 
                    suppressContentEditableWarning={true} 
                    onBlur={changeTitle} 
                    ref={ref} 
                    style={{color:`${color}`}} 
                    contentEditable={isEditable}>
                        {title}
                </DivTitle>
                {!isAll && <CreateIcon onClick={toggleEditable} sx={{color:"#DFDFDF",marginLeft:"14px",cursor:"pointer"}}/>}
            </Typography>
        </Title>
    )
})
const Title = styled("div")({
    display:"flex",
    alignItems:"center"
})
const DivTitle = styled("div")({
    '@media (max-width: 1500px)' : {
        fontSize: "calc(15px + (38-15) * ((100vw - 320px) / (1500 - 320)))"
    }
})

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if(document.selection)
    { 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}