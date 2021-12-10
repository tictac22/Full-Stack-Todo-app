
import React,{memo, useMemo} from "react";
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { setTodo } from "../../redux/todoSlice";
import { shallowEqual } from "react-redux";
interface Props {
    title:string,
    color:string,
    handleClickOpen(title:string):void,
}
import {isMobile} from 'react-device-detect';

export const FolderItem:React.FC<Props> = memo(({title,color,handleClickOpen}) => {
    const {currentTodo} = useAppSelector(state=>state.todo,shallowEqual);
    const dispatch = useAppDispatch()
    const setCurrentTodo = ():void => {
        dispatch(setTodo({todo:title}))
    }
    return (
        <Folder onClick={setCurrentTodo} style={{background:`${currentTodo === title ? "#FFFFFF" : "" }`,boxShadow:`${currentTodo === title ? "0px 2px 10px rgba(0, 0, 0, 0.03)" : "" }`}}>
            <FolderColor style={{backgroundColor:`${color}`,display:`${isMobile ? "none" : ""}`}}>
            </FolderColor>
            <FolderTitle>
                {title}
            </FolderTitle>
            <IconClose className="icon" onClick={(e)=>{handleClickOpen(e,title)}}/>
        </Folder>
    )
})
const IconClose = styled(CloseIcon)({
    color:"#E3E3E3",
    cursor:`${isMobile ? "" : "pointer"}`,
    opacity:`${isMobile ? "1" : "0"}`,
    visibility:`${isMobile ? "visible" : "hidden"}`,
    width:`${isMobile ? "18px" :  ""}`
})
const Folder = styled("div")({
    padding:"10px",
    display:"flex",
    alignItems:"center",
    transition: "all 0.2s linear",
    borderRadius: "4px",
    marginTop:"14px",
    ":hover" : {
        background: "#FFFFFF",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
    },
    ":hover .icon" : {
        opacity:"1",
        visibility:"visible",
    }
})

const FolderColor = styled("div")({
    borderRadius:"50%",
    width:"10px",height:"10px",
    flex:"0 0 10px"

})

const FolderTitle = styled("div")({
    marginLeft:"10px",
    textOverflow:"ellipsis",
    flex:"1 1 auto",
    overflow: "hidden",
    whiteSpace: "nowrap",
})