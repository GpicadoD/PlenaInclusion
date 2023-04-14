// This code imports the "newActivities" model from its respective module
import newActivities from "../models/newActivityModel.js";

// This code defines a controller function called "AddnewActivities" that extracts the the name of the activity and the date from the request body
// confirms if the activity has a date or otherwise it will send a message of no date from the activity
// if everything is correct, then creates a new activity from the name and the date and sends a json message of the success
export const AddnewActivities = async(req, res) => {
    var { activityId, nameAct, idPublic, idTheme, idImgAct, startDate, finishDate, idPeriod, idCreator } = req.body;
    if(!activityId) return res.status(400).json({msg: "Cant update without PK"});

    try {
        await newActivities.create({
            activityId,
            nameAct,
            idPublic,
            idTheme,
            idImgAct,
            startDate,
            finishDate,
            idPeriod,
            idCreator
        });
        res.json({msg: "Activity added successfully!"});
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

export const UpdateActivities = async(req, res) => {
    var {activityId, NameAct, idPublicType, idTheme, idImgAct, startDate,
        finishDate, idPeriod, idCreator} = req.body;
    
    if(!activityId) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const activity = await newActivities.findByPk(activityId);
        
        if(!NameAct) NameAct  = activity.nameAct;
        if(!idPublicType) idPublicType  = activity.idPublicType;
        if(!idTheme) idTheme  = activity.idTheme;
        if(!idImgAct) idImgAct  = activity.idImgAct;
        if(!startDate) startDate  = activity.startDate;
        if(!finishDate) finishDate  = activity.finishDate;
        if(!idPeriod) idPeriod  = activity.idPeriod;
        if(!idCreator) idCreator  = activity.idCreator;
        activity.set({
            nameAct: NameAct,
            idPublicType: idPublicType,
            idTheme: idTheme,
            idImgAct: idImgAct,
            startDate: startDate,
            finishDate: finishDate,
            idPeriod: idPeriod,
            idCreator: idCreator

        });
        await activity.save();
        res.json({msg: "Activity Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}