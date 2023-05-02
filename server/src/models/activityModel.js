// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";


const {DataTypes} = Sequelize;
// Define the "Activities" model using Sequelize
const Activities = db.define('activities', {
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    date:{
        type: DataTypes.DATE
    }
},{
    freezeTableName: true
});
// Synchronize the model with the database
(async () => {
await db.sync();
})();
// Export the "Activities" model
export default Activities;