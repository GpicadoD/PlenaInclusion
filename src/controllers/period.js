// This code imports the "Period" model from its respective module
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

export const addNewPeriod = async (req, res) => {
    var { period } = req.body;
    if(!period) return res.status(400).json({msg: "Cant update without PK"});

    console.log(period)
    try {
      await Period.create({
        period,
      });
      res.json({ msg: "Period created successfully" });
    } catch (error) {
      console.log(error);
    }
  };
  
export const DeletePeriod = async(req, res) => {
    const { idPeriod } = req.body;
    try {
        let periods = await Period.findByPk(idPeriod);
        console.log(periods);
        if(periods == null){
            return res.json({msg: "public not found"});  
        } 
        else{
            if(periods.idPeriod == idPeriod){
            await periods.destroy();
            return res.json({msg: "public successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}
