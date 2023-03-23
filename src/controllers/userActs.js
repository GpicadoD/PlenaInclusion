import Activities from "../models/userActModel.js";

export const GetActivities = async(req, res) => {
    try {
        const activities = await Activities.findAll({
            attributes:['id', 'name', 'date']
        });
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
}

export const AddActivities = async(req, res) => {
    const {nameAct, date} = req.body;
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