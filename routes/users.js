"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const User = require("../models/user");
const Hobbies = require("../models/hobbies");
const { createToken } = require("../helper/tokens");
const userRegisterSchema = require("../schemas/userRegister.json");
const userAuthSchema = require("../schemas/userAuth.json");

const router = express.Router();

/** POST / { user} 
 * 
 * Invokes the upload function to add an image_id to the user's data profile.
 */

router.post("/:username/upload", async function (req, res, next) {
  await User.upload(req.params.username, req.body.key);
})

/** GET / { user} 
 * 
 *  get user information 
 */

router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);

    const hobbies = await Hobbies.get(req.params.username);
    user.hobbies = hobbies;

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
})

/** PATCH / { user} 
 * 
 * Update user information
 */

router.patch("/:username", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, userUpdateSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    await Hobbies.update(req.body);  
    console.log("##########################", req.body);
    let userInfo = {...req.body};
    console.log("userInfo", userInfo)
    delete userInfo["hobbies"];
    // delete userInfo[interests];
    
    const user = await User.update(req.params.username, userInfo);
    
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
})

module.exports = router;
