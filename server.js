const express = require("express");
const database = require("./config/db");
const taskRouter = require("./routes/taskRoute");

require("dotenv/config");

const {PORT} = process.env;

console.log(PORT)

const port = PORT;

const app = express();
app.use(express.json());

database();
app.use("/api", taskRouter)
app.listen(port, () => {
    console.log(new Date().toLocaleDateString(), port)
});

