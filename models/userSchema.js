const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstnameclient: {type: String}, lastnameclient: {type: String}, passwordclient: {type: String}, confirmpasswordclient: {type: String}, emailclient: {type: String}, contactnumberclient: {type: String}, parmanentaddressclient: {type: String}, temporaryaddressclient: {type: String}, serviceArray: [String],ageclient: {type: String}, dobclient: {type: String}, checkoutamt: {type: Number} ,aadharcardclient: {type: String}, isLoggedIn: {type: Boolean},clientcompanyID: {type: String}, pricemodel: {type: [[String, Number]]} ,tokens: [{token: {type: String,required: true}}],
})

userSchema.pre('save', async function (next) {
    if (this.isModified('passwordclient')) {
        this.passwordclient = await bcrypt.hash(this.passwordclient, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}


const User = mongoose.model('USER', userSchema);
module.exports = User;