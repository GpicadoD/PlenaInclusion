import Organizer from "../models/organizerModel.js";

export const GetOrganizer  = async(req, res) => {
    try {
        let usersData = await Organizer.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

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