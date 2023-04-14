import Theme from "../models/themeModel.js";

export const GetTheme  = async(req, res) => {
    try {
        let usersData = await Theme.findAll();
        res.json(usersData);
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