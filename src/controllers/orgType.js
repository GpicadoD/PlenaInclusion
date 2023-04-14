import OrgType from "../models/orgTypeModel.js";

export const GetOrganizerType  = async(req, res) => {
    try {
        let usersData = await OrgType.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const DeleteOrganizerType = async(req, res) => {
    const { idTypeOrg } = req.body;
    console.log(idTypeOrg);
    try {
        let orgtype = await OrgType.findByPk(idTypeOrg);
        console.log(orgtype);
        if(!orgtype){
            return res.json({msg: "organizer not found"});  
        } 
        else{
            if(orgtype.idTypeOrg == idTypeOrg){
            await orgtype.destroy();
          
            return res.json({msg: "organizer successfully delete"});  
            } 
        }
    }   
    catch (error) {
        console.log(error);
    }
}