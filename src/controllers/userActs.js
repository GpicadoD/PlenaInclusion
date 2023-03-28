import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";
import UserActs from "../models/userActModel.js";

export const GetList = async(req, res) => {
    try {
        const userActs = await UserActs.findAll({});
        res.json(userActs);
    } catch (error) {
        console.log(error);
    }
}

export const AddList = async(req, res) => {
    const {idAct, idUser} = req.body;
    try {
        let activity = await Activities.findByPk(idAct);
        let user = await Users.findByPk(idUser);
        //console.log(activity);
        user.addActivities(activity);
        
        res.json({msg: "User - Activity Registration Successfully"});
    } catch (error) {
        console.log(error);
    }
}