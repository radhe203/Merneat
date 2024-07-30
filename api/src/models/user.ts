import mongoose from 'mongoose';
import userType from "../Types/userType"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    addressLine1: {
        type: String
    },
    city: {
        type: String
    }, 
    country: {
        type: String
    }
}, { timestamps: true })

const User = mongoose.model<userType>('User', userSchema)
export default User;

