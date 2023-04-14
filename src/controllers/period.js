import Period from "../models/periodModel.js";

export const GetPeriod  = async(req, res) => {
    try {
        let Data = await Period.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const UpdatePeriod = async(req, res) => {
    var {idPeriod, period} = req.body;
    
    if(!idPeriod) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const periodM = await Period.findByPk(idPeriod);
        
        if(!period) period  = periodM.period;
        periodM.set({
            period: period
        });
        await periodM.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}