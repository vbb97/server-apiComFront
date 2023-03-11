import mongoose from "mongoose";

const schema = mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    userId: String,
});

const { ObjectId } = mongoose.Types;

schema.pre('save', async function (next) {  
    this.set('_id', new ObjectId());
    next();
});

const Contact = mongoose.model('Contact', schema);

export default Contact;