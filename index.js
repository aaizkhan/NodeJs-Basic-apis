const express = require("express");
// const users = require("./MOCK_DATA.json");

const { connectMongoDb } = require("./connection");
const { createLogRequest } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

// connection
connectMongoDb("mongodb://127.0.0.1:27017/my-practice-1");

app.use(express.urlencoded({ extended: false }));

// Middleware
app.use(createLogRequest("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("Server Started"));
