// This code imports the "PeriodicAct" model from its respective module
import PeriodicAct from "../models/periodicActivityModel.js";

// This controller function uses the "findAll" method to retrieve all periodic activities from the database
// It then sends the data as a JSON response to the client
export const GetperiodicActs  = async(req, res) => {
    try {
        let Data = await PeriodicAct.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

// This controller function adds a new periodic activity to the database based on the data provided in the request body
export const DeletePeriodAct = async(req, res) => {
    const { actDate, idAct } = req.body;
    const dateA = new Date(actDate);
    try {
        let pact = await PeriodicAct.findOne({
            where: {
                ActDate: dateA,
                activityId: idAct
            }
        });
        console.log(pact);
        await pact.destroy();
        console.log(pact);
        res.json({msg: "PeriodicAct removed successfully!"});
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
