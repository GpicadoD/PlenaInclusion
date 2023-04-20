// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
// It also imports the "newActivities" model previously defined.

const {DataTypes} = Sequelize;
// Define the "Theme" model using Sequelize
const Theme = db.define('theme', {
    idTheme:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    themeName:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "Theme" model
export default Theme;