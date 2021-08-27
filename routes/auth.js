"use strict";

/** Routes for authentication. */

// const jsonschema = require("jsonschema");

const User = require("../models/user");
const Hobbies = require("../models/hobbies")
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helper/tokens");
const { BadRequestError } = require("../expressError");
const multer = require('multer');
const upload = multer();
const AWS = require("aws-sdk");
const { v4: uuid } = require('uuid');
const {AWS_REGION, S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY} = require('../secret');


AWS.config = new AWS.Config({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

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


//  app.post('/uploadphoto', upload.single('picture'), (req, res) => {
//   var img = fs.readFileSync(req.file.path);
// var encode_image = img.toString('base64');
// // Define a JSONobject for the image attributes for saving to database

// var finalImg = {
//     contentType: req.file.mimetype,
//     image:  new Buffer(encode_image, 'base64')
//  };
// db.collection('quotes').insertOne(finalImg, (err, result) => {
//   console.log(result)

//   if (err) return console.log(err)

//   console.log('saved to database')
//   res.redirect('/')


// })
// })


router.post("/register", upload.single('imgFile'), async function (req, res, next) {
  // const validator = jsonschema.validate(req.body, userRegisterSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }
  // TODO: look up multer -> grabs encoded data and add to req.file
  const id = uuid();
  console.log(id);
  console.log("req.file", req.file)
  console.log("req.file.mimetype", req.file.mimetype);
  const extension = req.file.mimetype.split("/")[1]

  // const encode_image = req.file.toString('base64');
  const finalImg = {
    Bucket: S3_BUCKET,
    ACL: "public-read",
    Key: id + "." + extension,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  console.log("Final Image", finalImg);


  // await s3
  //   .putObject(finalImg)
  //   .promise();

  await s3.upload(finalImg, () => console.log("################ UPLOADING"));

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
