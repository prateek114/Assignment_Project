import mongoose,{Schema} from "mongoose";

const resumeSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    jobCompany:{
        type:String,
        required:true,
    },
    jobTitle:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Resume=mongoose.model("Resume",resumeSchema);