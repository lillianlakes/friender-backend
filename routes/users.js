"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userRegisterSchema = require("../schemas/userRegister.json");
const userAuthSchema = require("../schemas/userAuth.json");

const router = express.Router();

// /** POST / { user} 
//  * 
//  * Invokes the upload function to add an image_id to the user's data profile.
//  */

// router.post("/:username/upload", async function (req, res, next) {
//     await User.upload(req.params.username, req.body);
// })