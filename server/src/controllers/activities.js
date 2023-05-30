// This code imports the "Activities" and "Users" models from their respective modules
import Activities from "../models/activityModel.js";
import CompAct from "../models/comActModel.js";
import Users from "../models/userModel.js";
import { Sequelize } from "sequelize";


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
    const {nameAct = null, date = null} = req.body;
    console.log("pre crear");
    if(date == null) return res.status(400).json({msg: "There is no date in the activity"});
    try {
        await Activities.create({
            name: nameAct,
            date: date
        });
        res.json({msg: "Activity Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "GetActByDate" that extracts the activity two dates from the request body
// It then validates that both dates fields are not null, and if those are, it sends a 400 status response to the client with a JSON message indicating that the field is missing
// If the fields are not missing, it the activities data between those two dates as a JSON response to the client
export const GetActByDate = async (req, res) => {
    try {
      const { firstDate, lastDate } = req.body;
      console.log(firstDate);
      const dateA = new Date(firstDate);
      const dateB = new Date(lastDate);
      if (!firstDate || !lastDate) {
        return res.status(400).json({ msg: "Please provide a start date and an end date." });
      }
      const activities = await CompAct.findAll({
        where: {
          date: {
            [Sequelize.Op.between]: [dateA, dateB]
          }
        },
        attributes: ["activityId", "name", "date"],
      });
      res.json(activities);
    } catch (error) {
      console.log(error);
    }
  }