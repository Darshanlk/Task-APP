const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const {sendEmail}  = require('../emails/accounts')
const upload = multer({
  // dest: "avatar",
  limits: {
    fieldSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a jpg or jpeg or png document"));
    }
    cb(undefined, true);

    // cb(new Error("File must be a PDF"))
    // cb(undefined,true)
    // cb(undefined,false)
  },
});
let text

router.get("/users/me", auth, async (req, res) => {
  // try {
  //   const res_data = await User.find();
  //   return res.status(200).json({ message: res_data });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(404).json({ error: "users not found" });
  // }
  res.status(200).json({ message: req.user });
});

router.get("/users/:id", async (req, res) => {
  try {
    const res_data = await User.findById({ _id: req.params.id });

    return res.status(200).json({ message: res_data });
  } catch (err) {
    console.log(err);

    return res.status(404).json({ error: "Id not found" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    text = `Welcome to the app, ${user.name}. Now you are the part of our sucess story.`    
    sendEmail(user.email,text)
    const token = await user.generateAuthToken();

    res
      .status(201)
      .json({ message: user, token, message_extra: "signup token" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "User Creation failed" });
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((filed) => {
    return allowUpdates.includes(filed);
  });

  if (!isValidOperation) {
    return res.status(400).json({ error: "invalid operation" });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // runValidators:true
    // });

    res.status(200).json({ message: req.user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "updation failed!" });
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try 
  {
    text =`Good bye ${req.user.name}.Thanks for support.`
    sendEmail(req.user.email,text)
    await req.user.remove();


    return res.status(200).json({ message: "user deleted successfully" });

    // const res_data = await User.findByIdAndDelete(req.user._id);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ erroe: "User not found" });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      console.log(token.token !== req.token);
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({ message: "You logout successfully" });
  } catch (err) {
    req.status(500).send();
    console.log(err, "error");
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = []; //empty array

    console.log(req.user.tokens);

    await req.user.save();

    res
      .status(200)
      .json({ message: "You logout successfully from all devices" });
  } catch (err) {
    console.log(err);
    req.status(500).send();
  }
});

router.post(
  "/users/me/upload",
  auth,
  upload.single("upload"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send({ message: "image upload sucessfully" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/remove_profile", auth, async (req, res) => {
  try {
    req.user.avatar = null;
    await req.user.save();

    res.send({ message: "image removed suceesfully" });
  } catch (err) {
    console.log(err);
    res.send("Internal server error");
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Not found" });
  }
});

module.exports = router;





//sendGrid_key= "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"