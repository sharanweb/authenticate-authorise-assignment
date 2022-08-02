const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const router = express.Router();
const User = require('../model/user');
require('dotenv').config();


// Register 
router.post("/register", async (request, response) => {
    console.log('register hit');

    const { name, email, password } = request.body;
    let registerdUser = await User.findOne({ email: email });

    if (registerdUser) {
        return response.status(400).send({ message: "Email already exists" });
    }
    let validateEmail = validator.isEmail(email);
    if (!validateEmail) {
        return response.status(400).send({ message: "Email is not valid" });
    }

    // hashing the password
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            // creating the new user
            const user = new User({ name, email, password: hashedPassword, });

            user.save().then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        result,
                    });
                })
 
                .catch((error) => { response.status(500).send({
                        message: "Error creating user",
                        error: error.message
                    });
                });
        })
 
        .catch((e) => { response.status(500).send({ message: "Password was not hashed successfully", e,});
    });


});



// login
router.post("/login", (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt.compare(request.body.password, user.password) .then((passwordCheck) => {
            // check if password matches
                    if (!passwordCheck) {
                        return response.status(400).send({message: "Passwords does not match",error, });
                    }
                    //   create  token
                    const token = jwt.sign({ userId: user._id, userEmail: user.email},
                        process.env.TOKEN_KEY,
                        { expiresIn: "12h" }
                    );

                    //   return success response
                    response.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })

                .catch((error) => { response.status(400).send({ message: "Passwords does not match", error,});
                });
        })
        .catch((e) => {
            response.status(404).send({
                message: "Not Registered",
                e,
            });
        });
});


module.exports = router;