// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
// It also imports the "newActivities" model previously defined.

const {DataTypes} = Sequelize;
// Define the "Public" model using Sequelize
const Public = db.define('public', {
    idPublic:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    public:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

Public.belongsTo(newActivities, { through: newActivities });
// Export the "Public" model
export default Public;