import PeriodicAct from "../models/periodicActivityModel.js";

export const GetPerAct = async(req, res) => {
    try {
        let usersData = await PeriodicAct.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

export const DeletePeriodAct = async(req, res) => {
    const { actDate, activityId } = req.body;
    try {
        let actdates = await PeriodicAct.findOne({
            actdates : [actDate]
        });
        let actid = await PeriodicAct.findByPk(activityId);
        
        console.log(actDate);
        console.log(activityId);
        if( !actdates  || !actid ){
            return res.json({msg: "period-activity not found"});  
        } 
        else{
            if(actdates.actDate == actDate && actid.activityId == activityId){
            await actid.destroy();
            return res.json({msg: "period-activity successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}