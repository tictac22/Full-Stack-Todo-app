

import React,{useMemo, useState} from "react";
import ListIcon from '@mui/icons-material/List';

import { AddFolder } from "./addFolder";

import { MethodsService } from "../../api/methodsService";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { styled } from '@mui/system';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FolderItem } from "./folderItem";
import { IFolders } from "../../interfaces";
import { shallowEqual } from "react-redux";
import { useAppDispatch,useAppSelector } from './../../redux/store';
import { setTodo } from "../../redux/todoSlice";


export const NavBar:React.FC = () => {
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState<string>("");
    const {currentTodo} = useAppSelector(state=>state.todo,shallowEqual)
    const dispatch = useAppDispatch()
    const handleClickOpen = useMemo(()=>(e,folderTitle:string) => {
        e.stopPropagation()
        setOpen(true);
        setTitle(folderTitle)
    },[]);
    const handleClose = () => {
        setOpen(false);
    };
    const setAllTodo = ():void => {
        dispatch(setTodo({todo:""}))
    } 
    const queryClient = new useQueryClient();
    const {data} = useQuery<IFolders[]>(["folder"],()=>MethodsService.getFolder());
    const mutation = useMutation((data:{title:string})=>MethodsService.deleteFolder(data.title),{
        onSuccess: async data => {
            await queryClient.invalidateQueries('folder')
            setAllTodo()
        },
    })
    const deleteFolder =()=> {
        mutation.mutate({title});
        setOpen(false);
    }
    return (
        <Wrapper>
            <Title style={{background:`${currentTodo}` ? "none" : "#FFFFFF", boxShadow:`${currentTodo}` ? "none" : "0px 2px 10px rgba(0, 0, 0, 0.03)" }} onClick={setAllTodo}>
                <ListIcon sx={{color:"#7C7C7C",marginRight:"6px"}}/>All tasks
            </Title>
            <div>
                {data?.length >= 1 && data?.map((item)=>
                <FolderItem key={item.title} handleClickOpen={handleClickOpen} title={item.title} color={item.color}/>
                )}
            </div>
            <AddFolder/>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Do you really want to delete {title} folder
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={deleteFolder} autoFocus>
                    Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    )
}
const Wrapper = styled("div")({
    backgroundColor:"#F4F6F8",
    width:"40%",
    height:"100%",
    padding:"57px 20px 210px 28px",
    '@media (max-width: 1500px)' : {
        paddingTop: "calc(15px + (57-15) * ((100vw - 320px) / (1500 - 320)))",
        paddingRight: "calc(15px + (20-15) * ((100vw - 320px) / (1500 - 320)))",
        paddingLeft: "calc(15px + (28-15) * ((100vw - 320px) / (1500 - 320)))"
    }
})

const Title = styled("h3")({
    padding:"10px",
    fontSize:"14px",
    display:"flex",
    alignItems:"center",
    background: "#FFFFFF",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.03)",
    borderRadius: "4px",
    flexWrap:"wrap",
    whiteSpace:"nowrap",
})

