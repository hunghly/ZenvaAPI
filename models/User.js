import {Schema} from 'mongoose';
import mongoose from '../database/mongodb.js';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {type: String, required: true, index: { unique: true}},
    password: {type: String, required: true}
})


function updatePassword (user, next) {
    console.log("next is here: " + next);
    bcrypt.genSalt(10, function(err, salt) {
        // if there's an error with salt gen, then the next step is to return the err
        if (err) {
            return next(err);
        }
        console.log(user.password);
        // if no error, then hash the password using the salt. we check for errors again during the hash step.
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            console.log("here's the hash: " + hash);
            user.password = hash;
            next();
        })
    })
}

userSchema.pre('save', function(next) {
    updatePassword(this, next);
});

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return next(err);
        return next(null, isMatch);
    })
}

export default mongoose.model('user', userSchema);