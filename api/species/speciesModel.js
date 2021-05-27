const db = require('../data/db-config')

const findAll = async () => {
    const data = await db('species')
        .select("*")
    return data
}

const findByID = async (id) => {
    const data = await db('species')
        .where('species_id', id)
        .select("*")
        .first()
    return data;
}
const findByFilter = async (filter) => {
    const data = await db('species')
        .where('species_type', filter)
        .first()
        .select("*")
    return data
}

const addResource = async (data) => {
    const newResource = await db('species')
        .insert({
            species_type: data
        },'species_id')
    return findByID(newResource[0])
}

const deleteResource = async (id) => {
    const toDelete = await db('species')
        .where('species_id', id)
        .del()
    return toDelete
}
module.exports = {
    findAll,
    findByID,
    findByFilter,
    addResource,
    deleteResource
}