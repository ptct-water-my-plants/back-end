const model = require('../users/usersModel')

const checkRegisterContents = () => async (req, res, next) => {
    const { username, password, phoneNumber} = req.body

    if(!username) {
        return res.status(404).json({
            message: 'Username is required'
        })
    }

    if(!password) {
        return res.status(404).json({
            message: 'Password is required'
        })
    }

    if(!phoneNumber) {
        return res.status(404).json({
            message: 'Phone number is required'
        })
    }

    next()
}

const queryUsernameRegister = () => async (req, res, next) => {
    const verification = await model.findByUsername(req.body.username)

    if(verification) {
        return res.status(418).json({
            message: 'Username already exists'
        })
    }

    next()
}

const checkContents = () => async (req, res, next) => {
    const { username, password } = req.body

    if(!username) {
        return res.status(404).json({
            message: "Username is required"
        })
    }

    if(!password) {
        return res.status(404).json({
            message: 'Password is required'
        })
    }

    next()
}

const checkTypeOf = () => (req, res, next) => {
    const { username, password } = req.body

    if(req.body.phoneNumber) {
        if(typeof req.body.phoneNumber != 'string') {
            return res.status(400).json({
                message: 'Phone number must be a string'
            })
        }
    }

    if(typeof username != 'string') {
        return res.status(400).json({
            message: 'Username must be a string'
        })
    }

    if(typeof password != 'string') {
        return res.status(400).json({
            message: 'Password must be a string'
        })
    }

    next()
}

const queryUsernameLogin = () => async (req, res, next) => {
    const { username } = req.body
    const verification = await model.findByUsername(username)

    if(!verification) {
        return res.status(418).json({
            message: 'user does not exist'
        })
    }

    req.hashPassword = verification.password
    req.user_id = verification.user_id
    req.username

    next()
}

module.exports = {
    checkRegisterContents,
    queryUsernameLogin,
    queryUsernameRegister,
    checkContents,
    checkTypeOf
}