import {Schema} from 'mongoose';
import mongoose from '../database/mongodb.js'

const userSchema = new Schema({
    username: {type: String, required: true, index: { unique: true}}
})

const User = mongoose.model('user', userSchema);

export default User;