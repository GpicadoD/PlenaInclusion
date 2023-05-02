// This code imports the "ImgOrg" model from its respective module
import ImgOrg from "../models/imgOrgModel.js";
// This function retrieves all the data from the ImgOrg model and sends it as a JSON response
export const DeleteImgOrg = async(req, res) => {
    const { idImgOrg } = req.body;
    try {
        let Imgorg = await ImgOrg.findByPk(idImgOrg);
        console.log(Imgorg);
        if(Imgorg == null){
            return res.json({msg: "ImgOrg not found"});  
        } 
        else{
            if(Imgorg.idImgOrg == idImgOrg){
            await Imgorg.destroy();
            return res.json({msg: "ImgOrg successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}   
export const GetimgOrg  = async(req, res) => {
    try {
        let Data = await ImgOrg.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}
