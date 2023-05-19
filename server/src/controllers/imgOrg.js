// This code imports the "ImgOrg" model from its respective module
import ImgOrg from "../models/imgOrgModel.js";
import fs from "fs";
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

export const uploadImgOrg = async (req, res) => {
    try {
        console.log(req.file);
    
        if (req.file == undefined) {
        return res.send(`You must select a file.`);
        }
    
        ImgOrg.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        ImgOrg: fs.readFileSync('resources/statict/assets/uploads/' + req.file.filename
        ),
        }).then((ImgOrg) => {
        fs.writeFileSync('resources/statict/assets/uploads/' + ImgOrg.filename, ImgOrg.ImgOrg
        );
    
        return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
    };