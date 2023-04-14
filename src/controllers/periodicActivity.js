// This code imports the "PeriodicAct" model from its respective module
import PeriodicAct from "../models/periodicActivityModel.js";

export const GetperiodicActs  = async(req, res) => {
    try {
        let Data = await PeriodicAct.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const DeletePeriodAct = async(req, res) => {
    const { actDate, activityId } = req.body;
    try {
        let actdates = await PeriodicAct.findByPk(actDate);
        let actid = await PeriodicAct.findOne({
            actid : [ activityId ] 
    });

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
export const Addnewperiodact = async (req, res) => {
  var { actDate, activityId, orgNif, actPlace } = req.body;
  if(!actDate || !activityId) return res.status(400).json({msg: "Cant update without PK"});

  try {
    await PeriodicAct.create({
      actDate : actDate,
      activityId: activityId,
      orgNif: orgNif,
      actPlace: actPlace
    });
    res.json({ msg: "periodicActivity created successfully" });
  } catch (error) {
    console.log(error);
  }
};
