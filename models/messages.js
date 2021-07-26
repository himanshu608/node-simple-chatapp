const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    user:{
        type: 'string',
        required: true
    },
    message:{
        type: 'string',
        required: true
    }
})

const Msg = mongoose.model('messages',Schema);

module.exports = Msg;