
import React, { useState,memo } from "react"
import {Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { useQuery } from "react-query";
import { IFolders } from "../../interfaces";
import { MethodsService } from './../../api/methodsService';
import {TodoItem} from "./todoItem"
const theme = createTheme({
    palette: {
        primary: {
          main:"#4DD599"
        },
    }
});
export const Todo:React.FC = memo(() => {
    const {currentTodo} = useAppSelector(state=>state.todo,shallowEqual);

    const {data}  = useQuery<IFolders[]>(["folder"],()=>MethodsService.getFolder());
    const currentDataTodo = data?.length && data?.find(item=>item.title === currentTodo) || "";
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{padding:"0 15px"}}>
                {
                    currentDataTodo ? <TodoItem 
                                        isAll={false} 
                                        tasks={currentDataTodo.tasks} 
                                        title={currentDataTodo.title} 
                                        color={currentDataTodo.color}
                                        /> 
                                    : 
                    data?.length >= 1 && data.map(item=>{
                        return <TodoItem 
                                    isAll={true} 
                                    key={item.title} 
                                    tasks={item.tasks} 
                                    title={item.title} 
                                    color={item.color}
                                />
                    })
                }
            </Box>
        </ThemeProvider>
    )
})