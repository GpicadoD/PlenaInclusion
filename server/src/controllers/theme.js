// This code imports the "Theme" model from its respective module
import Theme from "../models/themeModel.js";


// This code defines a controller function called "Gettheme" that uses the "findAll" method to retrieve all public themes from the database
// It then sends the theme data as a JSON response to the client
export const GetTheme  = async(req, res) => {
    try {
        let Data = await Public.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

//

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

// This code defines a controller function called "UpdateTheme" that extracts the ID and new name of a theme from the request body
// If the ID is missing, it sends an error response to the client
// Otherwise, it finds the theme in the database by its ID and updates its name to the provided new name
// It then sends a success message to the client
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

// This controller function creates a new theme in the database

export const Addnewtheme = async (req, res) => {
  var { idTheme, themeName } = req.body; // Extract the theme ID and name from the request body
if(!idTheme) return res.status(400).json({msg: "Cant update without PK"});

try {
    await Theme.create({// Create a new theme in the database
    idTheme,
    themeName,
    });
    res.json({ msg: "Theme created successfully" }); // Return a success message
} catch (error) {
    console.log(error); // Log any errors that occur
}};