const db = require('../data/config')
const bcrypt = require('bcryptjs')

const getAll = async () => {
    const data = await db ('users as u')
        .select(
            'u.user_id',
            'u.username',
            'u.phoneNumber'
        )
    
    return data
}

const getByUsername = async (username) => {
    const data = await db ('users as u')
        .where('u.username', username)
        .select(
            "u.user_id",
            "u.username",
            "u.password",
            "u.phoneNumber"
        )
        .first()
    return data
}

const getById = async (id) => {
    const data = await db ('users as u')
        .where("users_id", id)
        .select(
            "u.user_id",
            "u.username",
            "u.phoneNumber",
            "u.password"
        )
        .first()
    return data
}

const addResource = async(data) => {
    const newUser = await db ('users')
        .insert({
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber
        }, "user_id")
    return getById(newUser[0])
}

const removeResource = async (id) => {
    const deleteResource = await db('users')
        .where('user_id', id)
        .del()
    return deleteResource
}

const updateResource = async (id, resource) => {
    const existingResource = await findById(id)

    const newResource = {
        username: (resource.username ? resource.username : existingResource.username),
        phoneNumber: (resource.phoneNumber) ? resource.phoneNumber: existingResource.phoneNumber,
        password: (resource.password ? await bcrypt.hash(resource.password, 10): existingResource.password)
    }

    const update = await db('users')
        .where('user_id', id)
        .update(newResource, 'user_id')

    const editPost = await getById(update[0])
    
    return editPost
}

const findUsersPlants = async(id) => {
    const data = await db('users as u')
        .innerJoin('plants as p', 'p.user_id', 'u.user_id')
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .select("*")
        .where('p.user_id', id)

    const returnObj = {
        user_id: data[0].user_id,
        username: data[0].username,
        phoneNumber: data[0].phoneNumber,
        plantCollection: []
    }

    if(data) {
        returnObj.plantCollection = data.map(data => {
            return {
                plant_id: data.plant_id,
                nickname: data.nickname,
                water_frequency: data.water_frequency,
                species_id: data.species_id,
                species_type: data.species_type
            }
        })
    }

    return returnObj
}

module.exports = {
    getAll,
    getById,
    getByUsername,
    addResource,
    removeResource,
    updateResource,
    findUsersPlants
}