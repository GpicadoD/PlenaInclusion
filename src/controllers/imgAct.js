// This code imports the "ImgAct" model from its respective module

import ImgAct from "../models/imgActModel.js";

// This is a controller function that retrieves all image activities from the database and sends them as a response to the client
export const GetimgAct  = async(req, res) => {
    try {
        // Retrieve all image activities from the database
        let Data = await ImgAct.findAll();
        // Send the retrieved data as a response to the client in JSON format
        res.json(Data);
        // If there is an error, log it to the console
    } catch (error) {
        console.log(error);
    }
}
