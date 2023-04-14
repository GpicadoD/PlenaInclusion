import PublicType from "../models/publicModel.js";


export const GetPublicType  = async(req, res) => {
    try {
        let usersData = await Theme.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const DeletePublic = async(req, res) => {
    const { idPublic } = req.body;
    try {
        let publics = await PublicType.findByPk(idPublic);
        console.log(publics);
        if(publics == null){
            return res.json({msg: "public not found"});  
        } 
        else{
            if(publics.idPublicType == idPublic){
            await publics.destroy();
            return res.json({msg: "public successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}