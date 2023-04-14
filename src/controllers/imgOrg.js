import ImgOrg from "../models/imgOrgModel.js";

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