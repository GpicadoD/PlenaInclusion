// This code imports the "Competitor" model from its respective module
import Competitor from "../models/competitorModel.js";

// This code defines a controller function called "GetCompetitor" that uses the "findAll" method to retrieve all Competitors from the database
// It then sends the usersData data as a JSON response to the client
export const GetCompetitor  = async(req, res) => {
    try {
        let usersData = await Competitor.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}