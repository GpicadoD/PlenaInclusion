// This code imports the "ImgOrg" model from its respective module
import ImgOrg from "../models/imgOrgModel.js";

export const GetimgOrg  = async(req, res) => {
    try {
        let Data = await ImgOrg.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}
