const model = require()
const db = require('../data/db-config')
const speciesModel = require('../species/speciesModel')

const allowSameNicknameOnEdit = () => async ( req, res, next ) => {
    const editTarget = await model.findByID(req.params.id)
    if ( req.body.nickname == editTarget.nickname ){
        req.sameAllowed = true;
        next()
    }
}

const plantHasContents = () => async (req,res,next) => {
    if(!req.body.nickname){
        return res.status(404).json({message:"nickname Missing "})
    }
    if(!req.body.water_frequency){
        return res.status(404).json({message:"water_frequency Missing :("})
    }
    if(!req.body.user_id){
        return res.status(404).json({message:"user_id Missing :("})
    }
    next();
}

const checkSpeciesDB = () => async(req,res,next)=>{   
    
    if(req.body.species || req.body.species_type){
        if(req.body.species){
            const speciesCheck = await speciesModel.findByFilter(req.body.species)

            if(!speciesCheck){
                const newSpecies = await speciesModel.addResource(req.body.species)
                req.species_id = newSpecies.species_id   
             
                next()
            }else{
                req.species_id = speciesCheck.species_id
               
                next()
            }

        }
        if(req.body.species_type){
            const speciesCheck = await speciesModel.findByFilter(req.body.species_type)

            if(!speciesCheck){
                const newSpecies = await speciesModel.addResource(req.body.species)
                req.species_id = newSpecies.species_id   
                
                next()
            }else{
                req.species_id = speciesCheck.species_id
                
                next()
            }
        }
       
    } else {
        return res.status(412).json({
            message: "Include species"
        })
    }
}

const typeOf = () => async (req,res,next) => {

    if(typeof req.body.nickname != 'string'){
        return res.status(409).json({message:"nickname needs to be a string"})
    }
    if(typeof req.body.water_frequency != "string"){
        return res.status(409).json({message:"water_frequency needs to be a string"})
    }
    if(typeof req.species_id != "number"){
        return res.status(409).json({message:"species_type currently needs to be a number"})
    }
    if(typeof req.body.user_id != "number"){
        return res.status(409).json({message:"user_id needs to be a number"})
    }
    
    next();
}

const nicknameUnique = () => async (req,res,next) => {
    try{
        const dataCheck = await model.findByNickname(req.body.nickname)
        if(dataCheck){
            return res.status(418).json({message:"Nickname already exists"})
        }
        next();
    }catch(err){
        next(err)
    }
}
const forceSpeciesKeyName = () => async(req,res,next)=>{
if(req.body.species_type){
    req.body.species = req.body.species_type
}
}

module.exports = {
    plantHasContents,
    checkSpeciesDB,
    typeOf,
    nicknameUnique,
    allowSameNicknameOnEdit
}
