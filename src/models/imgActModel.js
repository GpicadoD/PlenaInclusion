// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
// It also imports the "newActivities" model previously defined.

const {DataTypes} = Sequelize;
// Define the "ImgAct" model using Sequelize
const ImgAct = db.define('imgAct', {
    idImgAct:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ImgAct:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

ImgAct.belongsTo(newActivities, { through: newActivities });
// Export the "ImgAct" model
export default ImgAct;