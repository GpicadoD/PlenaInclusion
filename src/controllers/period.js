import Period from "../models/periodModel.js";


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