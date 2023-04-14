// This code imports the "newActivities" model from its respective module
import newActivities from "../models/newActivityModel.js";

// This code defines a controller function called "AddnewActivities" that extracts the the name of the activity and the date from the request body
// confirms if the activity has a date or otherwise it will send a message of no date from the activity
// if everything is correct, then creates a new activity from the name and the date and sends a json message of the success
export const AddnewActivities = async(req, res) => {
    const {nameAct, date} = req.body;
    if(date == null) return res.status(400).json({msg: "There is no date in the activity"});
    try {
        await newActivities.create({
            name: nameAct,
            date: date,
        });
        res.json({msg: "Activity Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "GetnewActivities" that uses the "findAll" method to retrieve all new activities from the database
// It then sends the activities data as a JSON response to the client
export const GetnewActivities = async(req, res) => {
    try {
        const activities = await newActivities.findAll({});
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
}