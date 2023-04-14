import ImgAct from "../models/imgActModel.js";

export const GetimgAct  = async(req, res) => {
    try {
        let Data = await ImgAct.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}