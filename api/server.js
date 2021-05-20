const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the API"
    })
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something has gone awry."
    })
})

module.exports = server