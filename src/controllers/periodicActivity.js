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