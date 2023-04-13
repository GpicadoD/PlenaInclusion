// This code imports the "Activities" and "Users" models from their respective modules
import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";

// This code defines a controller function called "GetActivities" that uses the "findAll" method to retrieve all activities from the database
// It then sends the activities data as a JSON response to the client
export const GetActivities = async(req, res) => {
    try {
        const activities = await Activities.findAll({});
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "AddActivities" that extracts the activity name and date from the request body
// It then validates that the "date" field is not null, and if it is, it sends a 400 status response to the client with a JSON message indicating that the field is missing
// If the field is not missing, it creates a new activity record in the database with the provided name and date, and sends a JSON response indicating success or failure
export const AddActivities = async(req, res) => {
    const {nameAct, date} = req.body;
    if(date == null) return res.status(400).json({msg: "There is no date in the activity"});
    try {
        await Activities.create({
            name: nameAct,
            date: date,
        });
        res.json({msg: "Activity Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}