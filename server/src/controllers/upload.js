import fs from "fs";
import ImgAct from "../models/imgActModel.js";

export const uploadFiles = async (req, res) => {
try {
    console.log(req.file);

    if (req.file == undefined) {
    return res.send(`You must select a file.`);
    }

    ImgAct.create({
    type: req.file.mimetype,
    name: req.file.originalname,
    ImgAct: fs.readFileSync('resources/statict/assets/uploads/' + req.file.filename
    ),
    }).then((ImgAct) => {
    fs.writeFileSync('resources/statict/assets/uploads/' + ImgAct.filename, ImgAct.ImgAct
    );

    return res.send(`File has been uploaded.`);
    });
} catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
}
};