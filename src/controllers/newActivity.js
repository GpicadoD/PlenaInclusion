import newActivities from "../models/newActivityModel.js";

export const AddnewActivities = async(req, res) => {
    const {nameAct, date} = req.body;
    if(date == null) return res.status(400).json({msg: "There is no date in the activity"});
    try {
        await newActivities.create({
            nameAct: nameAct,
            startDate: date,
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