import newActivities from "../models/newActivityModel.js";

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

export const GetnewActivities = async(req, res) => {
    try {
        const activities = await newActivities.findAll({});
        res.json(activities);
    } catch (error) {
        console.log(error);
    }
}