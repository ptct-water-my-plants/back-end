require('dotenv').config()
const express = require('express')
const model = require('../users/usersModel')
const router = express.Router()
module.exports = {
    checkRegisterContents,
    queryUsernameRegister,
    checkContents,
    checkTypeOf,
    queryUsernameLogin
} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', 
    checkRegisterContents(),
    checkTypeOf(),
    queryUsernameRegister(),
    async (req, res, next) => {
        try {
            const { username, password, phoneNumber } = req.body
            const data = await model.addResource({
                username,
                password: await bcrypt.hash(password, 10),
                phoneNumber
            })

            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    })

    router.post('/login',
        checkTypeOf(),
        checkContents(),
        queryUsernameLogin(),
        async (req, res, next) => {
            try {
                const dbPass = req.hasPassword
                const bodyPass = req.body.password
                const passwordValidation = await bcrypt.compare(bodyPass, dbPass)
                if (passwordValidation === fals) {
                    return res.status(401).json({
                        message: 'invalid credentials'
                    })
                }

                const token = jwt.sign({
                    subject: req.body.username,
                    user_id: req.user_id,
                    expiresIn: '24hr',
                    loginSuccessful: true
                }, process.env.JWT_SECRET)

                res.cookie("token", token)
                res.status(200).json({
                    message: `Welcome to the server ${req.body.username}`,
                    user_id: req.user_id,
                    username: req.body.username,
                    token: token
                })
            } catch (err) {
                next(err)
            }
        })

module.exports = router;