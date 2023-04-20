// This code imports the "CompAct", "Competitor" and "newActivity" models from their respective modules
import CompAct from "../models/comActModel.js";
import Competitor from "../models/competitorModel.js";
import PeriodicAct from "../models/periodicActivityModel.js";

// This code defines a controller function called "GetCompAct" that uses the "findAll" method to retrieve all CompActs from the database
// It then sends the CompActData data as a JSON response to the client
export const GetComAct  = async(req, res) => {
    try {
        let compActData = await CompAct.findAll();
        res.json(compActData);
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "AddnewList" that extracts the id of the activity and the id of the user from the request body
// It then searches the id by the PK from the "activity" and the "user", and if it is, then the activity adds a new user with the addCompetitor
// If the field is not missing, it creates a new Competitor record in the database with the provided activity and user, and sends a JSON response indicating success or failure
export const AddnewList = async(req, res) => {
    const {idAct, idUser} = req.body;
    try {
        let activity = await PeriodicAct.findOne({
            activityId: [idAct]
          });
        let user = await Competitor.findByPk(idUser);
        activity.addCompetitor(user);
        res.json({msg: "User - Activity Registration Successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const DeleteCompAct = async(req, res) => {
    const { NifCom } = req.body;
    try {
        let participant = await Competitor.findAll(NifCom);
        let Comact = await CompAct.findAll(NifCom);
        console.log(participant);
        if(Comact.NifCom == null){
            return res.json({msg: "Participant not found"});
        }
        else{
            if(participant.NifCom == NifCom){
            await participant.destroy();
            await Comact.destroy();
            return res.json({msg: "Participant successfully delete"});  
            } 
        }

    } 
    catch (error) {
        console.log(error);
    }
}