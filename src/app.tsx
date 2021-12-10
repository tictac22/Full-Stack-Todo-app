
import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import { Home } from "./pages/home"

import { Registration } from "./pages/forms/registration"
import { Login } from "./pages/forms/login"
import { RecoverPassword } from "./pages/forms/forgotPassword"
import { Provider } from "react-redux"
import { store } from './redux/store';
import { QueryClientProvider,QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ActivateAccount } from './pages/forms/activateAccount';
import { ResettingPassword } from './pages/forms/resetingPassword';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false,
        },
    },   
})

export const App:React.FC = () => {
    return (
        <div className="wrapper">
            <QueryClientProvider client ={queryClient}>
                <Provider store={store}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/password" element={<RecoverPassword/>}/>
                            <Route path="/resetpassword:token" element={<ResettingPassword/>}/>
                            <Route path="/confirm:link" element={<ActivateAccount/>}/>
                        </Routes>
                    </Router>
                </Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    )
}