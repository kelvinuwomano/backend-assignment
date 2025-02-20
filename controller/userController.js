const taskModel = require("../model/taskModel");
const taskManagerModel = require("../model/taskModel");
const bcrypt = require("bcrypt");

const handleError = (res, error) => {
    return res
    .status(500)
    .json({ message: "An error occured", error: error || error.message})
};

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        
        if(!password || !email) {
            return res.status(400).json({ message: "All fields required"})
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await taskManagerModel.create({
            userName,
            email,
            password : hashPassword,
            task : []
        });
        return res.status(200).json({ success: true, data: createUser});
    } catch (error) {
       handleError(res, error) 
    }
};

const getAllTasks = async (req, res) => {
    try {
        const allTask = await taskManagerModel.find();
        res.status(200).json({message: "Gotten all users", data: allTask});
    } catch (error) {
        handleError(res, error)
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const checkIfEmailExist = await taskManagerModel.findOne({ email });

        if(!checkIfEmailExist) {
            res.status(200).json({ message: "Invalid email or password"});
        }
        const checkPassword = await bcrypt.compare(password, checkIfEmailExist.password);
        if(!checkPassword) {
            res.status(200).json({ message: "Invalid email or password"});
        }
        return res.status(200).json({ message: "Login successful", name: checkIfEmailExist.userName, email: checkIfEmailExist.email, id: checkIfEmailExist._id})
    } catch (error) {
        handleError(res, error)
    }
};

const addTask = async (req, res) => {
    try {
        const {title, description, completed} = req.body;

        const findTaskById = await taskManagerModel.findById(req.params.id);

        const createTask = await findTaskById.task.push({
            title,
            description,
            completed,
        });
        await findTaskById.save();
        return res.status(200).json({message: "Task added", task: findTaskById})
    } catch (error) {
        handleError(res, error)
    }
};

const updateTask = async (req, res) => {
    try {
        const { userId, taskId} = req.params;
        const { title, description, completed} = req.body;

        const newTask = await taskManagerModel.findById(userId);

        if (!newTask) {
            return res.status(404).json({ message: "User not found" });
        };
        
        const update = await newTask.update.id(taskId)
        
        if(!update) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        if (title) task.title = title
        // if (description) update.description = description
        // if (completed) update.completed = completed
        
        await newTask.save();
    return res.status(200).json({message: "Updated successfully", data: newTask})
    } catch (error) {
        handleError(res, error.message)  
    }
};

module.exports = { register, getAllTasks, login, addTask, updateTask}