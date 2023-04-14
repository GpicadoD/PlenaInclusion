// This code imports the "Theme" model from its respective module
import Theme from "../models/themeModel.js";

export const Gettheme  = async(req, res) => {
    try {
        let Data = await Public.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateTheme = async(req, res) => {
    var {idTheme, themeName} = req.body;
    
    if(!idTheme) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const theme = await Theme.findByPk(idTheme);
        
        if(!themeName) themeName  = periodM.themeName;
        theme.set({
            themeName: themeName
        });
        await theme.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
