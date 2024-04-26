import mongoose from 'mongoose';
import userType from "../../../types/userType"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
},{timestamps:true})

const User = mongoose.model<userType>('User', userSchema)
export default User;

