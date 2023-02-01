// const mongoose = require("mongoose");
// const validator = require("validator");
// mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
//   useNewUrlParser: true,
// });

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     hide:true,
//     minLength:7,
//     validate(value) {
      
//  if(value.toLowerCase().includes('password'))
//       {
//         throw new Error("password not used for Password")
//       }
//     },
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive Number");
//       }
//     },
//   },
// });
// const me = new User({
//   name: "cameroon",
//   email: "cameroon@GoodEagle.com",
//   password:"cameroon@xyz",
//   age: 30,
// })
//   .save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const Tasks = mongoose.model("Tasks", {
//   task: {
//     type: String,
//     required:true,
//     trim:true
//   },
//   completed: {
//     type:Boolean,
//     default:false
//   }
// });

// const task = new Tasks({
//   task: "watchout data process",
//   completed: true,
// })
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((err) => console.log(err));
