import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface State {
    currentTodo:string
}

const initialState:State = {
    currentTodo:""
}


const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers: {
        setTodo:(state,{payload}:PayloadAction<{todo:string}>) => {
            state.currentTodo = payload.todo
        }
    }
})
export const {setTodo} = todoSlice.actions
export const todoReducer = todoSlice.reducer