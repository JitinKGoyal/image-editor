const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const signUpValidations = [
    body('name', "Name must be minimum of 2 chars").isLength({ min: 2 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Paswword must be minimum of 5 chars").isLength({ min: 5 })]

const loginValidations = [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a password").isLength({ min: 1 })]

// For Sign Up
router.post('/signup', signUpValidations, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email }); // 2sec

    if (user) {
        return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

    const salt = bcrypt.genSaltSync(10);
    const securedPass = bcrypt.hashSync(req.body.password, salt);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
    }).then(user => res.json(user));

    // const user = User(req.body);
    // user.save();
});


// For login
router.post('/login', loginValidations, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // const user = await User.findOne({ email: req.body.email });

    User.findOne({ email: req.body.email }, async (err, user) => {

        if (err) {
            return res.status(404).json({ errors: [{ msg: "user does not exists" }] });
        }

        // req.body.password  -> simple string
        // user.password  -> encrypted 
        const result = bcrypt.compareSync(req.body.password, user.password);
        if (!result) return res.status(404).json({ errors: [{ msg: "incorrect password" }] });

        res.json(user);
    });


})

module.exports = router;