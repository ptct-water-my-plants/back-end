const model = require('./speciesModel');

const querySpeciesDB = () => async (req,res,next) => {   
    try{
        const {species} = req.body
        const verification = await model.findByFilter(species)

            if(typeof verification == 'object'){
               return res.status(417).json({message:"This species is already in the DB"})

            }else{
                
                req.speciesIdentifier = req.body.species
                next();
            }

    }catch(err){
        next(err)
    }
}

const checkType = () => async (req,res,next) => {
    const {species} = req.body
    if (typeof species != 'string'){
        return res.status(416).json({message:"species needs to be a string"})
    }
    next();
}

const validateID = () => async (req,res,next) => {
    try{
        const validation = await model.findByID(req.params.id);
        if (!validation){
            return res.status(404).json({message:"Could not find by ID"})
        }
            req.validation = validation;
            next()
    }catch(err){
        next(err)
    }
}

const speciesUnique = () => async (req,res,next) => {
    try{
        const dataCheck = await model.findByFilter(req.body.species)
        if(dataCheck){
            return res.status(419).json({message:"Species already exists in the database"})
        }
        next();
    }catch(err){
        next(err)
    }
}

module.exports = {
    querySpeciesDB,
    speciesUnique,
    checkType,
    validateID
}