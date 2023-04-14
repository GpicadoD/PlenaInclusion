import Competitor from "../models/competitorModel.js";


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