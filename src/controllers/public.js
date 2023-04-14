// This code imports the "Public" model from its respective module
import PublicType from "../models/publicModel.js";

export const Getpublic  = async(req, res) => {
    try {
        let Data = await PublicType.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const UpdatePublic = async(req, res) => {
    var {idPublicType, publicType} = req.body;
    
    if(!idPublicType) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const Public = await PublicType.findByPk(idPublicType);
        
        if(!publicType) publicType  = Public.publicType;
        Public.set({
            publicType: publicType
        });
        await Public.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
