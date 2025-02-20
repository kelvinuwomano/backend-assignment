const { Schema, model} = require("mongoose");

const taskSchema = new Schema({
    userName : {
        type : String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    task: [
        {
            title: { type: String, required: true },
            description: { type: String },
            completed: { type: Boolean, default: false}
        },
    ],
});

module.exports = taskManagerModel = model("user_and_task", taskSchema)