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

export const DeleteTheme = async(req, res) => {
    const { idTheme } = req.body;
    try {
        let themes = await Theme.findByPk(idTheme);
        console.log(themes);
        if(themes == null){
            return res.json({msg: "theme not found"});  
        } 
        else{
            if(themes.idTheme == idTheme){
            await themes.destroy();
            return res.json({msg: "theme successfully delete"});  
            } 
        }
    } 
    catch (error) {
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

export const Addnewtheme = async (req, res) => {
  var { idTheme, themeName } = req.body;
  if(!idTheme) return res.status(400).json({msg: "Cant update without PK"});

  try {
    await Theme.create({
      idTheme,
      themeName,
    });
    res.json({ msg: "Theme created successfully" });
  } catch (error) {
    console.log(error);
  }
};
