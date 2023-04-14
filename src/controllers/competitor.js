// This code imports the "Competitor" model from its respective module
import Competitor from "../models/competitorModel.js";

// This code defines a controller function called "GetCompetitor" that uses the "findAll" method to retrieve all Competitors from the database
// It then sends the usersData data as a JSON response to the client
export const GetCompetitor  = async(req, res) => {
    try {
        let usersData = await Competitor.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}


export const UpdateCompetitor = async(req, res) => {
    var {NifCom, emergencyNumber} = req.body;
    
    if(!NifCom) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const competitor = await Competitor.findByPk(NifCom);
        
        if(!emergencyNumber) emergencyNumber  = competitor.emergencyNumber;
        competitor.set({
            emergencyNumber: emergencyNumber
        });
        await competitor.save();
        res.json({msg: "competitor Registration Successful"});
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
