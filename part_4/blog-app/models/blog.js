/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        minlength: 3,
        required: true,
    },
    url: {
        type: String,
        minlength: 3,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema)
