const express = require('express')
const model = require('./usersModel')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const data = await model.getAll()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const data = await model.getById(req.params.id)
        if(!data) {
            res.status(404).json({
                message: "Nothing found at that ID"
            })
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete(':/id', async (req, res, next) => {
    try {
        const data = await model.removeResource(req.params.id)
        res.status(204).json({
            message: `ID: ${req.params.id} has been deleted`
        })
    } catch(err) {
        next(err)
    }
})

router.put( '/:id', async (req, res, next) => {
    try {
        const data = await model.updateResource(req.params.id, req.body)
        res.status(202).json(data)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/plants', async (req, res, next) => {
    try {
        const data = await model.findUsersPlants(req.params.id)
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})

module.exports = router;