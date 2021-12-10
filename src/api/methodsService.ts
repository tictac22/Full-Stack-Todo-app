import axios from 'axios';
import { api, ErrorHandler } from './index';
export class MethodsService { 
    static async getFolder() {
        try {
            const response = await api.get("/methods/getfolders")
            return response.data
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async addFolder(color:string,folder:string){
        try {
            const response = await api.post("/methods/addfolder",{color,folder});
            return response
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async deleteFolder(folder:string) {
        try {
            const response = await api.post("/methods/deletefolder",{folder});
            return response 
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async changeTitle(prevValue:string,currentValue:string) {
        try {
            const response = await api.post("/methods/changeTitle",{prevValue,currentValue});
            return response 
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async addTask(title:string,task:string) {
        try {
            const response = await api.post("/methods/addTask",{title,task});
            return response 
        }
        catch(e) {
            const {data} = e.response
            throw new ErrorHandler(data.message,data.type,data.errors)
        }
    }
    static async toggleTask(currentFolder:string,task:string,isCompleted:boolean) {
        try {
            const response = await api.post("/methods/toggletask",{currentFolder,task,isCompleted});
            return response 
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async changeText(folder:string,valuePrev:string,valueNext:string) {
        try {
            const response = await api.post("/methods/changetext",{folder,valuePrev,valueNext});
            return response 
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
    static async deleteTask(folderCurrent:string,taskText:string) {
        try {
            const response = await api.post("/methods/deletetask",{folderCurrent,taskText});
            return response 
        }
        catch(e) {
            const {message,type,errors} = e.response.data
            throw new ErrorHandler(message,type,errors)
        }
    }
}
