const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        //Não exibe na consulta sql
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;