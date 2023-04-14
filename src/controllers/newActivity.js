import newActivities from "../models/newActivityModel.js";

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

export const GetnewActivities = async(req, res) => {
    try {
        const activities = await newActivities.findAll({});
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
}

export const DeleteNewActivity = async(req, res) => {
    const { activityId } = req.body;
    console.log(activityId);
    try {
        let newActivity = await newActivities.findByPk(activityId);
        console.log(newActivity);
        if(!newActivity){
            return res.json({msg: "newActivity not found"});  
        } 
        else{
            if(newActivity.activityId == activityId){
            await newActivity.destroy();
          
            return res.json({msg: "newActivity successfully delete"});  
            } 
        }
    }   
    catch (error) {
        console.log(error);
    }
}
