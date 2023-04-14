import CompAct from "../models/comActModel.js";
import Competitor from "../models/competitorModel.js";
import newActivities from "../models/newActivityModel.js";


export const GetComAct  = async(req, res) => {
    try {
        let compActData = await CompAct.findAll();
        res.json(compActData);
    } catch (error) {
        console.log(error);
    }
}

export const AddnewList = async(req, res) => {
    const {idAct, idUser} = req.body;
    try {
        let activity = await newActivities.findByPk(idAct);
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