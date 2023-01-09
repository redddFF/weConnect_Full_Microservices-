import mongoose from "mongoose" ; 
import mongoosePaginate from "mongoose-paginate" ;
import { buffer } from "stream/consumers";

let PostSchema =new mongoose.Schema({
    userName:String,
    title : String,
    description :String,
    ImageName:String,
    userId:String,
    fileType:String
    },{
    timestamps: true
    },
    
);
PostSchema.plugin(mongoosePaginate);
const Post =mongoose.model("Post",PostSchema) ; 
export default Post ; 