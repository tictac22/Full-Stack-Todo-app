
import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


import { QueryClientProvider,QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppContext } from "./context"
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        refetchOnWindowFocus: false,
        },
    },   
})
const DynamicHome  = React.lazy(() => import('./pages/home').then(module => ({default:module.Home})))
const DynamicRegistration  = React.lazy(() => import('./pages/forms/registration').then(module => ({default:module.Registration})))
const DynamicLogin  = React.lazy(() => import('./pages/forms/login').then(module => ({default:module.Login})))
const DynamicRecoverPassword  = React.lazy(() => import('./pages/forms/forgotPassword').then(module => ({default:module.RecoverPassword})))


export const App:React.FC = () => {
    return (
        <div className="wrapper">
            <QueryClientProvider client ={queryClient}>
                <AppContext>
                    <React.Suspense fallback={""}>
                        <Router>
                            <Routes>
                                <Route path="/" element={<DynamicHome/>}/>
                                <Route path="/registration" element={<DynamicRegistration/>}/>
                                <Route path="/login" element={<DynamicLogin/>}/>
                                <Route path="/password" element={<DynamicRecoverPassword/>}/>
                            </Routes>
                        </Router>
                    </React.Suspense>
                </AppContext>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    )
}