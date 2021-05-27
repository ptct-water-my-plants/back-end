const db = require('../data/db-config')
const speciesDB = require('../species/speciesModel')

const findAll = async ()=>{
    const data = await db
        .from('plants as p')
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .innerJoin('users as u', 'p.user_id', 'u.user_id')
        .select(
            "p.plant_id",
            "p.nickname",
            "p.water_frequency",
            "s.species_type",
            "s.species_id",
            "u.username as plantOwner",
            "u.user_id",
            "u.username"
            )
    return data
}

const findByID = async (id)=>{
    const data = await db
        .from('plants as p')
        .where('plant_id', id)
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .innerJoin('users as u', 'p.user_id', 'u.user_id')
        .select(
            "p.plant_id",
            "p.nickname",
            "p.water_frequency",
            "s.species_type as species",
            "s.species_type",
            "s.species_id",
            "u.username",
            "u.user_id"
            )
        .first()
    return data
}

const findByNickname = async (nickname)=>{
    const data = await db ('plants as p')
        .where('p.nickname', nickname)
        .select(
            "p.plant_id",
            "p.nickname",
            "p.water_frequency"
        )
        .first()
        return data
}

const addResource = async (data)=>{
    const id = await db('plants')
        .insert({
            nickname: data.nickname,
            water_frequency: data.water_frequency,
            species_id: data.species_id,
            user_id: data.user_id
        }, "plant_id")
    return findByID(id[0])
}

const deleteResource = async (id)=>{
    const deleteResource = await db('plants')
        .where('plant_id', id)
        .del()
    return deleteResource
}

const updateResource = async (id, resource, speciesID)=>{
    const updateTarget = await findByID(id)
    
   
    const toUpdate = await db('plants')
        .where('plant_id', id)
        .update({
            nickname: resource.nickname,
            water_frequency: resource.water_frequency,
            species_id: speciesID,
            user_id: resource.user_id
        }, 'plant_id')
    return findByID(toUpdate[0])
}

module.exports = {
    findAll,
    findByID,
    findByNickname,
    addResource,
    deleteResource,
    updateResource
}