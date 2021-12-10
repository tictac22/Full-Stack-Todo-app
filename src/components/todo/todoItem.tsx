
import React from "react"

import { styled } from '@mui/system';

import { Task } from './task';
import { AddTask } from './addTask';
import { TodoTitle } from "./title";

interface Props {
    color:string,
    tasks:{text:string,isCompleted:boolean}[],
    title:string,
    isAll:boolean,
}
export const TodoItem:React.FC<Props> = ({color,tasks,title,isAll}) => {
    return (
        <Wrapper>
            <TodoTitle color={color} title={title} isAll={isAll}/>
                <ul style={{margin:"8px 0px -10px -15px"}}>
                    {tasks.map(item=>
                        <Task 
                            isAll={isAll} 
                            key={item.text} 
                            currentFolder={title} 
                            isCompleted={item.isCompleted} 
                            text={item.text}
                        />
                    )}
                </ul>
            {!isAll && <AddTask title={title} color="primary"/>}
        </Wrapper>
    )
}

const Wrapper = styled("div")({
    paddingBottom:"20px",
    paddingTop:"20px",
    borderBottom:"1px solid #F2F2F2",
})
