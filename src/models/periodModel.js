// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
// It also imports the "newActivities" model previously defined.
const {DataTypes} = Sequelize;
// Define the "Period" model using Sequelize
const Period = db.define('period', {
    idPeriod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    period:{
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
// Export the "Period" model
(async () => {
    await db.sync();
})();
export default Period;