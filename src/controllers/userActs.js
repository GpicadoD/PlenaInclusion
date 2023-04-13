// This code imports the "Activities", "Users", and "UserActs" models from their respective modules
import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";
import UserActs from "../models/userActModel.js";

// This code defines a controller function called "GetList" that uses the "findAll" method to retrieve all user-activity relationships from the database
// It then sends the user-activity data as a JSON response to the client
export const GetList = async(req, res) => {
    try {
        const userActs = await UserActs.findAll({});
        res.json(userActs);
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "AddList" that extracts the activity and user IDs from the request body
// It then uses the "findByPk" method to find the corresponding activity and user records in the database
// It then associates the activity with the user using the "addActivities" method, and sends a JSON response indicating success or failure
export const AddList = async(req, res) => {
    const {idAct, idUser} = req.body;
    try {
        let activity = await Activities.findByPk(idAct);
        let user = await Users.findByPk(idUser);
        user.addActivities(activity);
        
        res.json({msg: "User - Activity Registration Successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const GetUserActivities = async(req, res) => {
    const { userId } = req.params; 
  
    try {
      const userActs = await UserActs.findAll({
        where: {
          userId: userId 
        },
        include: [
          {
            model: Activities 
          }
        ]
      });
      res.json(userActs);
    } catch (error) {
      console.log(error);
    }
  }
 
  
  
  
  
  
  