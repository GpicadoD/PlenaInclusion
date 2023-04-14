// This code imports the "Organizer" model from its respective module
import Organizer from "../models/organizerModel.js";

// This code defines a controller function called "GetOrganizer" that uses the "findAll" method to retrieve all users from the database
// It then sends the usersData data as a JSON response to the client
export const GetOrganizer  = async(req, res) => {
    try {
        let usersData = await Organizer.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}
