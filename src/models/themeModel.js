import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";

const {DataTypes} = Sequelize;
// Define the "Activities" model using Sequelize
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

// Export the "Activities" model
export default Theme;