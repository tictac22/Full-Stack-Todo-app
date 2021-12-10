
import React, { useState,memo, useRef } from "react"
import AddIcon from '@mui/icons-material/Add';
import {TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useMutation } from "react-query";
import { useAppSelector } from "../../redux/store";
import { MethodsService } from './../../api/methodsService';
import {useQueryClient} from "react-query"
interface Props {
    title:string,
    color:string
}
export const AddTask:React.FC<Props> = memo(({title}) => {
    const [showMenu,setShowMenu] = useState<boolean>(false);
    const queryClient = new useQueryClient()
    const [isError,setError] = useState<string>("");
    const ref = useRef(null);
    const mutation = useMutation((data:{folderName:string,task:string})=>
    MethodsService.addTask(data.folderName,data.task),{
        onError: data => {
            setError(data.message)
        },
        onSuccess:() => {
            hideMenu()
            queryClient.invalidateQueries('folder')
        },
    })
    const hideMenu = () => {
        setShowMenu(!showMenu)
    }
    const toAddtask = () => {
        if(!ref.current.value) {
            return setError("Could not be empty")
        }
        mutation.mutate({folderName:title,task:ref.current.value})
    }
    return(
        <>
        {!showMenu &&
        <TitleTask sx={{marginTop:"17px"}} onClick={hideMenu}>
            <AddIcon/>
            <p style={{marginLeft:"15px"}}>New task</p>
        </TitleTask>
        }
        {showMenu &&
            <div style={{display:"flex",flexDirection:"column",marginTop:"25px"}}>
                <FieldText
                    inputRef={ref}
                    placeholder="Text of the task" id="outlined-basic" 
                    variant="outlined"
                    error={!!isError}
                    helperText={isError}
                />
                <div>
                <Button onClick={toAddtask} type="submit" sx={{color:"white",marginTop:"15px",marginRight:"9px"}} variant="contained">Add task</Button>
                <Button
                    onClick={hideMenu} 
                    sx={{marginTop:"15px",color:"9C9C9C",backgroundColor:"#F4F6F8",":hover":{backgroundColor:"#cdd1d4"}}} 
                    variant="contained">
                    Cancel
                </Button>
                </div>
            </div>
        }
        </>
    )
})

const FieldText = styled(TextField)({
    height:"38px",
    maxWidth:"415px",
    "& div":{height:"38px"},
    marginBottom:"9px",
    "& p": {marginLeft:"0px"},
    "& input": {textOverflow: "ellipsis"}
})
const TitleTask = styled("div")({
    borderRadius:"4px",
    marginLeft:"-10px",
    display:"flex",
    alignItems:"center",
    color:"#B4B4B4",
    cursor:"pointer",
    padding:"10px",
    ":hover":{backgroundColor:"#F4F6F8"}
})