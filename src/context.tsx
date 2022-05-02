
import React, {useState, useContext}  from 'react';

interface IContext {
	currentTodo:string,
	setCurrentTodo:React.Dispatch<React.SetStateAction<string>>,
}
const Context = React.createContext<IContext>(null!);


interface Props {
	children:React.ReactNode
}
export const useTodo =  () => {
	return useContext(Context)
}
export const AppContext:React.FC<Props> = ({children}) => {
	const [currentTodo,setCurrentTodo] = useState("");
	return (
		<Context.Provider value={{currentTodo,setCurrentTodo}}>
			{children}
		</Context.Provider>
	)
}