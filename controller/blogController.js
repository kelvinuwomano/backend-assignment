const blogModel = require("../model/blogModel");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { username , email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = await blogModel.create({
            username,
            email,
            password: hashPassword,
            blog: []
        });
        return res.status(200).json({message: "User created successfully", data: createUser});
        
    } catch (error) {
        return res.status(500).json({message: "Unable to create user", errro: error.message});
        
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const checkIfUserExist = await blogModel.findOne({ email });

        if (!checkIfUserExist) {
            return res.status(400).json({ message: "Invalid email or password"});
        }

        const checkPassword = await bcrypt.compare( password, checkIfUserExist.password)
        if (!checkPassword) {
            return res.status(400).json({ message: "Invalid email or password"});
        }
        return res.status(200).json({ message: "Login successfully", username: checkIfUserExist.username, email: checkIfUserExist.email, id: checkIfUserExist._id})
    } catch (error) {
        return res.status(500).json({ message: "An error occured", error: error.message});
    }
};

const createBlogs = async (req, res) => {
    try {
        const { title, content, createdAt} = req.body;
        const {userId} = req.params;

        const addBlogsById = await blogModel.findById(userId)

        const addBlogs = await addBlogsById.blogs.push({
            title,
            content,
            createdAt,
        });
        await addBlogsById.save();
        return res.status(200).json({message : "Blog added successfully", data : addBlogs})
    } catch (error) {
        return res.status(400).json({ message : "Unable to add blogs", error: error.message})
    }
};


const updateBlogs = async (req, res) => {
    try {
        const { userId, blogId} = req.params;
        const {title, content} = req.body;

        const findUser = await blogModel.findById(userId);

        if (!findUser) {
            res.status(404).json({message : "User not found"})
        }
        
        const updateBlog = await findUser.blogs.id(blogId)
        
        if (!updateBlog) {
            res.status(404).json({message : "Blog not found"})
        }

        if (title) updateBlog.title = title;
        if (content) updateBlog.content = content;
        await findUser.save();

        return res.status(200).json({ message: "Updated successfully", data: updateBlog})
    } catch (error) {
        res.status(500).json({message: "Unable to update blog"})
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { userId, blogId} = req.params;

        const findUser = await blogModel.findById(userId);

        if (!findUser) {
            res.status(404).json({message:  "User not found"})
        }
        
        const deleteB = findUser.blogs.id(blogId);
        if (!deleteB) {
            res.status(404).json({message:  "Blog not found"})
        }
        findUser.blogs.pull(blogId);
        await findUser.save();
        return res.status(200).json({message : " deleted successfully"})
    } catch (error) {
        res.status(400).json({message : "Unable to delete"});
    }
}

module.exports = { register, login, createBlogs, updateBlogs, deleteBlog};