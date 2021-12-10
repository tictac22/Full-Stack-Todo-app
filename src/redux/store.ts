import { configureStore } from "@reduxjs/toolkit";
import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import { todoReducer } from "./todoSlice";
import { userReducer } from './userSlice';



export const store = configureStore({
    reducer: {
        user:userReducer,
        todo:todoReducer,
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()