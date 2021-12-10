
import mongoose from "mongoose"
import { string } from "yup";
const schema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"UserDatas",required:true},
    tasks:[
        {
            title:{type:String,required:true},
            color:{type:String,required:true},
            tasks:[
                {
                    text:String,
                    isCompleted:{type:Boolean,default:false}
                }
            ]
        }
    ]
})
export const TaskSchema =  mongoose.model("TaskSchema",schema);