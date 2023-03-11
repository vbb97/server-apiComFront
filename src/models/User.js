import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
});

const { ObjectId } = mongoose.Types;

schema.pre('save', async function (next) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(this.password, salt);
    
    this.set('_id', new ObjectId());
    this.set('password', passwordHash);
    next();
});

const User = mongoose.model('User', schema);

export default User;