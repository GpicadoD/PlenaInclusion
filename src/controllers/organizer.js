import Organizer from "../models/organizerModel.js";



export const GetOrganizer  = async(req, res) => {
    try {
        let usersData = await Organizer.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const DeleteOrganizer = async(req, res) => {
    const { idOrganizer } = req.body;
    console.log(idOrganizer);
    try {
        let organizers = await Organizer.findByPk(idOrganizer);
        console.log(organizers);
        if(!organizers){
            return res.json({msg: "organizer not found"});  
        } 
        else{
            if(organizers.NifOrg == idOrganizer){
            await organizers.destroy();
          
            return res.json({msg: "organizer successfully delete"});  
            } 
        }
    }   
    catch (error) {
        console.log(error);
    }
}
