const containsUsername = () => async (req, res, next) => {
    if(!req.body.username) {
        return res.status(404).json({
            message: "Missing username"
        })
    }

    next()
}

module.exports = containsUsername