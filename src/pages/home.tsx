
import React from "react"
import { NavBar } from "../components/navbar"
import { Todo } from "../components/todo/"
import {useNavigate} from "react-router-dom"
import { useQuery } from "react-query"
import { AuthService } from './../api/authService';
import { styled } from '@mui/system';
export const Home:React.FC = () => {
    const navigate = useNavigate();
    const {isLoading} = useQuery("isAuth", ()=>AuthService.isAuth(), {
        onSettled:data => {
            if(data.type === "auth") {
                return navigate("/login", { replace: true });
            }
        }
    })
    if(isLoading) {
        return <div></div>
    }
    return (
        <div style={{display:"flex",flex:"1 1 auto"}}>
            <NavBar/>
            <Div>
                <Todo/>
            </Div>
        </div>
    )
}

const Div = styled("div")({
    padding:"56px 0 0 56px",
    width:"70%",
    '@media (max-width: 1500px)' : {
        paddingLeft: "calc(15px + (56-15) * ((100vw - 320px) / (1500 - 320)))"
    }
});