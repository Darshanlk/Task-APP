const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");
//_____________________Task__________________________

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = await new Task({ ...req.body, owner: req.user._id }).save();
    return res.status(201).json({ message: "added task", data: task });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

// router.get("/tasks", auth, async (req, res) => {
//   // let query = req.query.isCompleted;

//   const match = {};
//   if (req.query.isCompleted) {
//     match.isCompleted = req.query.isCompleted === "true";
//   }

//   try {
//     // let res_data;
//     // if (req.query.isCompleted) {
//     //   res_data = await Task.find({
//     //     $and: [{ owner: req.user._id }, { isCompleted: query }],
//     //   }).limit(2);
//     // } else {
//     //   res_data = await Task.find({ owner: req.user._id }).limit(2);
//     // }

//     await req.user
//       .populate({
//         path: "tasks",
//         match,
//       })
//       .execPopulate();
//     res.send(req.user.tasks);
//   } catch (e) {
//     console.log(e)
//     res.status(500).send();
//   }
//   //   return res.status(200).json({ message: res_data });
//   // } catch (err) {
//   //   console.log(err);
//   //   return res.status(400).json({ error: "task not found" });
//   // }
// });


//pagenition and query params 
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  console.log(req.query.isCompleted);
  if (req.query.isCompleted) {
    match.isCompleted = req.query.isCompleted === "true";
  }

  if (req.query.sortBy) {
    console.log(req.query,typeof req.query)
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  
    console.log(sort[parts[0]])
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    // const res_data = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    return res.status(200).json({ message: task });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Task not found" });
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "isCompleted"];
  const isValidOperation = updates.every((field) =>
    allowUpdates.includes(field)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }
  try {
    const task = await Task.findByOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    z;
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    // const data = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });

    return res.status(200).json({ message: data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Updatation failed" });
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const res_data = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    return res
      .status(200)
      .json({ message: "task deleted successfully", deleted_data: res_data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ erroe: "Task not found" });
  }
});

module.exports = router;
