const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//Connection with mongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/my-practice-1")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("MongoDb Error in Connectiong", err));

// Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));

// Middleware
app.use((req, res, next) => {
  console.log("This Middleware 1");
  next();
});

// Routes
app.get("/users", async (request, response) => {
  const dbAllUsers = await User.find({});
  const html = `
    <ul>
    ${dbAllUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  response.send(html);
});

// REST APIs

// Get All Users
app.get("/api/users", async (request, response) => {
  const allDbUser = await User.find({});
  return response.json(allDbUser);
});

// Get Single User by Id
app
  .route("/api/users/:id")
  .get(async (request, response) => {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).json({ status: "no user found" });
    return response.json(user);
  })
  .patch(async (request, response) => {
    await User.findByIdAndUpdate(request.params.id, {
      lastName: request.body.lastName,
    });
    return response.json({ status: "success" });
  })
  .delete(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST users
app.post("/api/users", async (request, response) => {
  const body = request.body;

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  console.log("Result : ", result);
  return response.status(201).json({ message: "Success" });
});

app.listen(PORT, () => console.log("Server Started"));
