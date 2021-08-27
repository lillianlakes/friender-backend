"use strict";

/** Routes for authentication. */

// const jsonschema = require("jsonschema");

const User = require("../models/user");
const Hobbies = require("../models/hobbies")
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helper/tokens");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  // const validator = jsonschema.validate(req.body, userAuthSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }

  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  const token = createToken(user);
  return res.json({ token });
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  // const validator = jsonschema.validate(req.body, userRegisterSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }
  // TODO: look up multer -> grabs encoded data and add to req.file
  const newUser = await User.register({ ...req.body, friendRadius: Number(req.body.friendRadius) });
 
  await Hobbies.add(req.body);  
  // hobbies add ... connecting to specfic user
  // interests add ... connecting to specfic user
  
  const token = createToken(newUser);
  return res.status(201).json({ token });

  //// TODO: make this work
  // async function uploadToS3(options) {
  //   await s3
  //     .putObject({
  //       Bucket: options.bucket,
  //       ACL: options.acl || "public-read",
  //       Key: options.key,
  //       Body: Buffer.from(options.data, "base64"),
  //       ContentType: options.contentType,
  //     })
  //     .promise();
  
  //   return {
  //     url: `https://${options.bucket}.s3.amazonaws.com/${options.key}`,
  //     name: options.key,
  //     type: options.contentType || "application/",
  //   };
  // };
});


module.exports = router;
