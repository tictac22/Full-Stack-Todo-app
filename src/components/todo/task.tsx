
import React, { memo, useRef, useState,useEffect,useMemo } from "react"

import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

import { styled } from '@mui/system';

import { useMutation,useQueryClient } from "react-query";
import { MethodsService } from './../../api/methodsService';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { isMobile } from 'react-device-detect';

interface Props {
    text:string,
    isCompleted:boolean,
    currentFolder:string,
    isAll:boolean
}

export const Task:React.FC<Props> = memo(({text,isCompleted,currentFolder,isAll}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    const [isEditable,setIsEditable] = useState<boolean>(false);
    const toggleEditable = () => setIsEditable(!isEditable);
    const [isCheckhed,setIsChecked] = useState<boolean>(isCompleted);
    const ref = useRef(null)
    const prevValue = useMemo(()=>ref?.current && ref.current.innerText,[isEditable]);
    
    const queryClient = new useQueryClient();

    const mutationCheck = useMutation((data:{folder:string,task:string,completed:boolean})=>
    MethodsService.toggleTask(data.folder,data.task,data.completed),{
        onSuccess: ({data}) => {
            queryClient.setQueryData(['folder'],data.tasks)
            setIsChecked(!isCheckhed)
        }
    })
    const setChecked = () => {
        mutationCheck.mutate({folder:currentFolder,task:text,completed:!isCompleted})
    }

    const mutationChangeTask = useMutation(({folder,valuePrev,valueNext}:{folder:string,valuePrev:string,valueNext:string})=>
    MethodsService.changeText(folder,valuePrev,valueNext),{
        onSuccess: ()=> {
            queryClient.invalidateQueries("folder")
            toggleEditable()
        },
        onError: data => {
            ref.current.innerText = prevValue
        }
    })
    const changeTask = async () => {
        const currentValue = ref.current.innerText;
        if(currentValue === prevValue) return toggleEditable();
        if(!currentValue || currentValue.length > 30) {
            ref.current.innerText = prevValue;
            return toggleEditable()
        }
        mutationChangeTask.mutate({folder:currentFolder,valuePrev:prevValue,valueNext:currentValue});
    }
    const mutationDeleteTask = useMutation(({folderCurrent,taskText}:{folderCurrent:string,taskText:string})=>
    MethodsService.deleteTask(folderCurrent,taskText),{
        onSuccess:()=>{
            queryClient.invalidateQueries("folder")
        }
    })
    const deleteTask = () => {
        mutationDeleteTask.mutate({folderCurrent:currentFolder,taskText:text})
    }
    useEffect(()=>{
        ref && setEndOfContenteditable(ref.current)
    },[isEditable])
    return(
        <Wrapper>
            <WrapperProps className={`${isAll ? "all" : "notall"}`} >
                <div style={{height:"24px"}} onClick={isAll ? ()=> {} : setChecked}>
                    {isCheckhed ? <CheckCircleIcon sx={{color:"#4DD599",cursor:`${isAll ? "" : "pointer"}`}}/> 
                    : <CircleIcon sx={{
                        color: "white",
                        border: "2px solid #E8E8E8",
                        borderRadius: "50%",
                        cursor:`${isAll ? "" : "pointer"}`
                        }}/> }
                </div>  
                <ContentDiv
                    className="input" 
                    ref={ref} 
                    suppressContentEditableWarning={true}
                    contentEditable={isEditable}
                    onBlur={changeTask}>
                    {text}
                </ContentDiv>
                <IconCreate 
                    onClick={toggleEditable}
                    className="icon" 
                />
                <IconClose
                onClick={handleClickOpen} 
                className="icon"
                />
            </WrapperProps>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you want to delete {text}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={deleteTask}>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    )
})
const Wrapper = styled("div")({
    "& .notall": {
        ":hover":{backgroundColor:"#F4F6F8"},
        "&:hover .icon":{opacity:"1",visibility:"visible",pointerEvents:"all"},
        "&:hover  .input": {backgroundColor:"#F4F6F8"},
        "& .icon": {
            opacity:`${isMobile ? "1" : ""}`,
            visibility:`${isMobile ? "visible" : ""}`,
            pointerEvents:`${isMobile ? "all" : ""}`,
        }
    }
})

const WrapperProps = styled("div")({
    borderRadius:"4px",
    padding:"15px 15px 15px 15px",
    display:"flex",
    alignItems:"center",
    marginBottom:"-6px",
})

const ContentDiv = styled("div")({
    marginLeft:"15px",
    flex:"1 1 auto",
    textOverflow:"ellipsis",
    overflow:"hidden",
    "@media (max-width: 700px)": {
        marginLeft:"10px"
    }
})
const IconCreate =styled(CreateIcon)({
    height:"22px",
    width:"22px",
    color:"#E3E3E3",
    opacity:"0",
    visibility:"hidden",
    pointerEvents:"none",cursor:"pointer"
})

const IconClose = styled(CloseIcon)({
    color:"#E3E3E3",
    opacity:"0",
    visibility:"hidden",
    pointerEvents:"none",
    cursor:"pointer"
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