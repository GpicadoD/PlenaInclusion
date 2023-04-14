// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import newActivities from "./newActivityModel.js";
// It also imports the "newActivities" model previously defined.
const {DataTypes} = Sequelize;
// Define the "Public" model using Sequelize

const PublicType = db.define('publicType', {
    idPublicType:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicType:{
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
// Export the "Public" model
export default PublicType;
