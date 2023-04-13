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