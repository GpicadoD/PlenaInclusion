import Competitor from "../models/competitorModel.js";


export const GetCompetitor  = async(req, res) => {
    try {
        let usersData = await Competitor.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const AddCompetitor = async (req, res) => {
    var { NifCom, emergencyNumber } = req.body;
    if(!NifCom) return res.status(400).json({msg: "Cant update without PK"});

    try {
      await Competitor.create({
        NifCom: NifCom,
        emergencyNumber: emergencyNumber,
      });
      res.json({ msg: "Competitor added successfully" });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  