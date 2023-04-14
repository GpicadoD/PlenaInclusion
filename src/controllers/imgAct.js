import ImgAct from "../models/imgActModel.js";

export const GetImgAct = async(req, res) => {
    try {
        let usersData = await ImgAct.findAll();
        res.json(usersData);
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