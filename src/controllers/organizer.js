// This code imports the "Organizer" model from its respective module
import Organizer from "../models/organizerModel.js";

// This code defines a controller function called "GetOrganizer" that uses the "findAll" method to retrieve all users from the database
// It then sends the usersData data as a JSON response to the client
export const GetOrganizer  = async(req, res) => {
    try {
        let usersData = await Organizer.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "UpdateOrganizer" that updates the organizer with the specified "NifOrg" value in the database
// It updates the "idImgOrg" and "idtypeProf" properties with the values in the request body, if they are provided
// It then saves the changes to the database and sends a success message as a JSON response to the client
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

// This code defines a controller function called "Addneworganizer" that creates a new organizer in the database
// It extracts the values for "NifOrg", "idImgOrg", and "idtypeProf" from the request body and uses them to create a new organizer
// It then sends a success message as a JSON response to the client
export const Addneworganizer = async (req, res) => {
    var { NifOrg , idImgOrg , idtypeProf } = req.body;
    if(!NifOrg) return res.status(400).json({msg: "Cant update without PK"});

    try {
      await Organizer.create({
        NifOrg,
        idImgOrg,
        idtypeProf,
      });
      res.json({ msg: "Organizer created successfully" });
    } catch (error) {
      console.log(error);
    }
  };