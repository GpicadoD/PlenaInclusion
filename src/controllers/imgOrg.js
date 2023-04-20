// This code imports the "ImgOrg" model from its respective module
import ImgOrg from "../models/imgOrgModel.js";

// This function retrieves all the data from the ImgOrg model and sends it as a JSON response
export const GetimgOrg  = async(req, res) => {
    try {
        let Data = await ImgOrg.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}
