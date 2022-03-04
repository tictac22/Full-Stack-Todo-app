
import React,{useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import { AuthService} from './../../api/authService';
export const ActivateAccount:React.FC = () => {
    const {link} = useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        const a = async() => {
            try {
                const response =  await AuthService.activateEmail(link)
                
            }
            catch(e) {
            }
            finally{
                navigate(`/`);
            }
        }
        a();
    },[])
    return(
        <div>
            hello
        </div>
    )
}