const express = require("express");
const database = require("./config/db");
const blogRouter = require("./routes/blogRoute");


require("dotenv/config");

const {PORT} = process.env;

console.log(PORT);

const port = PORT;

const app = express();

database();

app.use(express.json());
app.use("/api/users", blogRouter);

app.listen(port, () => {
    console.log(new Date().toLocaleString(), port)
})
