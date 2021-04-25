// 1, table name: comments
// 2, model name: Comment
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    text: { type: String, required: true },
    time: {type: String, default: new Date().toISOString().slice(0, 10)},
    commenter: {
                id:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                username: { type: String, required: true }
    }
}, {collection: "comments"})

module.exports = mongoose.model("Comment", commentSchema);