import Organizer from "../models/organizerModel.js";

export const GetOrganizer  = async(req, res) => {
    try {
        let usersData = await Organizer.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateOrganizer = async(req, res) => {
    var {NifOrg, idImgOrg, idtypeProf} = req.body;
    
    if(!NifOrg) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const organizer = await Organizer.findByPk(NifOrg);
        
        if(!idImgOrg) idImgOrg  = organizer.idImgOrg;
        if(!idtypeProf) idtypeProf  = organizer.idtypeProf;
        organizer.set({
            idImgOrg: idImgOrg,
            idtypeProf: idtypeProf
        });
        await organizer.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
