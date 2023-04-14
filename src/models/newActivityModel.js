// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import CompAct from "./comActModel.js";
// It also imports the "CompAct" model previously defined.

const {DataTypes} = Sequelize;
// Define the "Activities" model using Sequelize
const newActivities = db.define('newactivities', {
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameAct:{
        type: DataTypes.STRING
    },
    idPublicType:{
        type: DataTypes.INTEGER
    },
    idTheme:{
        type: DataTypes.INTEGER
    },
    idImgAct:{
        type: DataTypes.INTEGER
    },
    startDate:{
        type: DataTypes.DATE
    },
    finishDate:{
        type: DataTypes.DATE
    },
    idPeriod:{
        type: DataTypes.INTEGER
    },
    idCreator:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

newActivities.belongsTo(newActivities, { through: newActivities });
// Export the "Activities" model
export default newActivities;