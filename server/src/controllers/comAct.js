// This code imports the "CompAct", "Competitor" and "newActivity" models from their respective modules
import { compare } from "bcrypt";
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
    const {idAct, idUser, actDate} = req.body;
    try {
        await CompAct.create({
            ActDate: actDate,
            NifCom: idUser,
            activityId: idAct
        });
        res.json({msg: "Activity added successfully!"});
    } catch (error) {
        console.log(error);
    }
}

export const DeleteCompAct = async(req, res) => {
    var { idAct, idUser, actDate } = req.body;
    const dateA = new Date(actDate);
    try {
        let Comact = await CompAct.findOne({
            where: {
                ActDate: dateA,
                NifCom: idUser,
                activityId: idAct
            }
        });
        console.log(Comact);
        await Comact.destroy();
        console.log(Comact);
        res.json({msg: "Activity removed successfully!"});
    } 
    catch (error) {
        console.log(error);
    }
}