
import React, { useMemo, useState,useRef, memo } from "react"
import AddIcon from '@mui/icons-material/Add';
import { Box,TextField,Button } from '@mui/material';
import { Color } from './color';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../../redux/store';
import { useMutation, useQueryClient } from "react-query";
import { MethodsService } from "../../api/methodsService";
const theme = createTheme({
    palette: {
        primary: {
          main:"#4DD599"
        },
    }
});
export const AddFolder:React.FC = memo(() => {
    const queryClient = new useQueryClient()
    const [popup,setPopup] = useState<boolean>(false);
    const [color,setCurrentColor] = useState<string>("");
    const [inputValue,setInputValue] = useState<string>("");
    const [helperText,setHelperText] = useState<string>("")
    const colors = useMemo(()=>["#C9D1D3","#42B883","#64C4ED","#FFBBCC","#B6E6BD","#C355F5","#09011A","#FF6464"],[]);
    const mutation = useMutation( async (data:{color:string,inputValue:string})=>
    MethodsService.addFolder(data.color,data.inputValue),{
        onSuccess:data => {
            toAddTask()
            return queryClient.invalidateQueries('folder')
        },
        onError:data => {
            setHelperText(data.message)
        }
    })
    const toAddTask = ():void => {
        setPopup(!popup)
        setCurrentColor("")
        setInputValue("")
        setHelperText("")
    }
    const setColor =  useMemo(()=>(currentColor:string):void=> {
        setCurrentColor(currentColor)
    },[])
    const folderAdd =  () => {
        mutation.mutate({color,inputValue});
    }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{position:"relative"}}>
                <Title onClick={toAddTask} sx={{backgroundColor:`${popup && "#FFFFFF"}`}}>
                    <AddIcon />
                    <p style={{marginLeft:"4px"}}>Add folder</p>
                </Title>
                {popup &&
                    <FolderWrapper>
                        <IconClose onClick={toAddTask}/>
                        <TextField 
                            error={!!helperText} 
                            helperText={helperText && helperText} 
                            onChange={(e)=>setInputValue(e.target.value)} 
                            value={inputValue} color="primary" size="small" id="standard-basic" label="Name of folder"/>
                        <ColorsWrapper>
                            {colors.map(item=><Color isActive={color} setColor={setColor} key={item} color={item}/>)}
                        </ColorsWrapper>
                        <SubmitButton type="submit" 
                            disabled={inputValue.length >= 1 && color ? false : true}
                            onClick={folderAdd} 
                            variant="contained">
                                Add
                        </SubmitButton>
                    </FolderWrapper>
                }
            </Box>
        </ThemeProvider>
    )
})

const Title = styled("div")({
    marginTop:"37px",
    ":hover":{backgroundColor:"#FFFFFF"},
    borderRadius:"4px",
    display:"flex",
    alignItems:"center",
    color:"#B4B4B4",
    cursor:"pointer",
    padding:"10px 10px 10px 3px",
    flexWrap:"wrap",
})
const FolderWrapper = styled("div")({
    position:"absolute",
    left:"30px",
    top:"56px",
    display:"flex",
    flexDirection:"column",
    width:"235px",
    backgroundColor:"#fff",
    padding:"18px",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "10px"
})
const IconClose = styled(CloseIcon)({
    cursor:"pointer",
    position:"absolute",
    backgroundColor:"#5C5C5C",
    color:"#fff",
    top:"-8px",
    right:"-11px",
    borderRadius:"50%"
})
const ColorsWrapper = styled("div")({
    display:"flex",
    "& div:not(:last-child)":{marginRight:"5px"},
    paddingTop:"13px"
})
const SubmitButton = styled(Button)({
    marginTop:"13px",
    backgroundColor:"#4DD599",
    width:"100%",
    ":focus,&:hover":{backgroundColor:"#3cad7c"}
})