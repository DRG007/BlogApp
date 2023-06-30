const express = require('express');
const db = require("../db")
const router = express.Router()
const cryptoJs = require("crypto-js")
const utils = require('../utils')
const config = require('../config')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const upload = multer({ dest: "images" });


router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password, phone } = request.body;
  const encryptedPassword = String(cryptoJs.SHA1(password));

  const query = `insert into user (firstName, lastName, email, password, phone) values (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.post('/signin', (request, response) => {
  const { email, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA1(password));
  const query = `select id,firstName,lastName from user where email = ? and password= ?`;
  db.query(query, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error))
    } else if (users.length == 0) {
      response.send(utils.createErrorResult("user does not exist"));
    } else {
      const { firstName, lastName, id } = users[0]

      const token = jwt.sign({
        id, firstName, lastName,
      }, config.key
      );

      response.send(utils.createSuccessResult({
        firstName, lastName, token,
      }
      ))
    }

  })
});
router.get("/profile", (request, response) => {
  const id = request.user.id;
  const query = `select firstName, lastName, email, phone, profileImage from user where id = ?`;
  db.query(query, [id], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (users.length == 0) {
      response.send(utils.createErrorResult("user does not exist"));
    } else {
      response.send(utils.createSuccessResult(users[0]));
    }
  });
});

router.put("/editprofile", (request, response) => {
  const id = request.user.id;
  const { firstName, lastName, email, phone } = request.body;
  const query = `update user set firstName = ?, lastName = ?, email = ?, phone = ? where id = ?`
  db.query(query, [firstName, lastName, email, phone, id], (error, result) => {
    response.send(utils.createSuccessResult(result));
  });
})

// router.patch("/editfirstname", (request, response) => {
//   const { firstName} = request.body;
//   const id = request.user.id;
//   const query = `update user set firstName = ? where id = ?`
//   db.query(query, [firstName, id], (error, result) => {
//     response.send(utils.createSuccessResult(result));
//   });
// })

router.post(
  "/upload-profile-image",
  upload.single("image"), // please use image as key while uploading a file
  (request, response) => {
    // get the uploaded file's file name
    const filename = request.file.filename;

    if (!filename || filename.length == 0) {
      response.send("your image uploading did not work, please try again");
    } else {
      const query = `update user set profileImage = ? where id = ?`;
      db.query(query, [filename, request.user.id], (error, result) => {
        response.send(utils.createResult(error, result));
      });
    }
  }
);

router.get("/profile-image", (request, response) => {
  const query = `select profileImage from user where id = ?`;
  db.query(query, [request.user.id], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (result.length == 0) {
      response.send(
        utils.createErrorResult("error while sending your profile")
      );
    } else {
      const { profileImage } = result[0];
      response.send(utils.createSuccessResult({ profileImage }));
    }
  });
});
module.exports = router;