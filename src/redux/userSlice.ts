import { createSlice, PayloadAction } from "@reduxjs/toolkit"




interface State {
    userId:string,
    isActivated:boolean
}

const initialState:State = {
    userId: "",
    isActivated:false
}
export const userSlice = createSlice({
    name:"userData",
    initialState,
    reducers: {
        setData:(state,{payload}:PayloadAction<{id:string,isActivated:boolean}>) => {
            state.userId = payload.id;
            state.isActivated = payload.isActivated
        }
    }
})

export const {setData} = userSlice.actions
export const userReducer = userSlice.reducer