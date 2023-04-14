import Competitor from "../models/competitorModel.js";

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