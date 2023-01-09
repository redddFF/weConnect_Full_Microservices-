import mongoose from "mongoose" ; 
import mongoosePaginate from "mongoose-paginate" ;


let userSchema=new mongoose.Schema({
    Nom:String,
    Prenom:String,
    Email:String,
    Password:String,
    Status:String,
    Birth:String,
    Gender:String,
    Num :Number 
},
 {
     timestamps: true
 }) ; 

 

userSchema.plugin(mongoosePaginate);
const User=mongoose.model("User",userSchema);

export default User ; 