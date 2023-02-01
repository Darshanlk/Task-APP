const express = require("express");
require("./db/mongoose");
const app = express();
const auth = require("./middleware/auth");
const port = process.env.PORT 
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// app.use((req,res,next) => {

//   if(req.method === "GET")
//   {
//     res.send("GET requests are ")

//   }else{

//     next()
//   }
// })


//multer

// app.post('/upload',upload.single('upload'),(req,res) => {

//   res.send()
  
// })






app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("63d8ee08343e0616a3fa4af8");
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);

//   const user = await User.findById("63d8e91fb84adbc261acf093");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();

// const bcrypt = require("bcryptjs");

// const hashFunction = async () => {
//   const password = "Red12345!"
//   const hash_password = await bcrypt.hash(password,10)

//   console.log(password)
//   console.log(hash_password)

//   const isMatch = await bcrypt.compare("Red12345!",hash_password)
//   console.log(isMatch)
// }

// hashFunction()

// const jwt = require("jsonwebtoken");

// const jwtFunction = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse",{expiresIn:"10 seconds"});
//   console.log(token);

//   const data = jwt.verify(token, "thisismynewcourse");

//   console.log(data);
// };

// jwtFunction();
