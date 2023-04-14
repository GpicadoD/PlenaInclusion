import PeriodicAct from "../models/periodicActivityModel.js";



export const Addnewperiodact = async (req, res) => {
  var { actDate, activityId, orgNif, actPlace } = req.body;
  if(!actDate || !activityId) return res.status(400).json({msg: "Cant update without PK"});

  try {
    await PeriodicAct.create({
      actDate,
      activityId,
      orgNif,
      actPlace
    });
    res.json({ msg: "periodicActivity created successfully" });
  } catch (error) {
    console.log(error);
  }
};