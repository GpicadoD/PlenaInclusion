<<<<<<< HEAD:src/controllers/competitor.js
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


// Controller function that updates a competitor's emergencyNumber based on the request body
export const DeleteCompetitor = async(req, res) => {
    const { NifCom } = req.body;
    try {
        let participant = await Competitor.findByPk(NifCom);
        console.log(participant);
        if(participant == null){
            return res.json({msg: "Participant not found"});  
        } 
        else{
            if(participant.NifCom == NifCom){
            await participant.destroy();
            return res.json({msg: "Participant successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}

export const UpdateCompetitor = async(req, res) => {
    var {NifCom, emergencyNumber} = req.body;
    
    // If NifCom is not present in the request body, return an error response
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

    // If emergencyNumber is not present in the request body, set it to the existing value in the database
export const AddCompetitor = async (req, res) => {
    var { NifCom, emergencyNumber } = req.body;
     // If NifCom is not present in the request body, return an error response
    if(!NifCom) return res.status(400).json({msg: "Cant update without PK"});

    try {
        // Create a new competitor with the given NifCom and emergencyNumber values
      await Competitor.create({
        NifCom: NifCom,
        emergencyNumber: emergencyNumber,
      });
      res.json({ msg: "Competitor added successfully" });
    } catch (error) {
      console.log(error);
    }
=======
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

export const DeleteCompetitor = async(req, res) => {
    const { NifCom } = req.body;
    try {
        let participant = await Competitor.findByPk(NifCom);
        console.log(participant);
        if(participant == null){
            return res.json({msg: "Participant not found"});  
        } 
        else{
            if(participant.NifCom == NifCom){
            await participant.destroy();
            return res.json({msg: "Participant successfully delete"});  
            } 
        }
    } 
    catch (error) {
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
>>>>>>> 812b6b3e7ef4916424ae070e54c3e28a9c206302:server/src/controllers/competitor.js
  };