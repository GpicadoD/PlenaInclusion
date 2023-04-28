// This code imports the "ImgAct" model from its respective module

import ImgAct from "../models/imgActModel.js";

export const GetimgAct  = async(req, res) => {
    try {
        let Data = await ImgAct.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const DeleteImgAct = async(req, res) => {
    const { idImgAct } = req.body;
    try {
        let ImgActs = await ImgAct.findByPk(idImgAct);
        console.log(ImgActs);
        if(ImgActs == null){
            return res.json({msg: "ImgAct not found"});  
        } 
        else{
            if(ImgActs.idImgAct == idImgAct){
            await ImgActs.destroy();
            return res.json({msg: "ImgAct successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}
