// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
// Define the "PeriodicAct" model using Sequelize
const PeriodicAct = db.define('periodicAct', {
    actDate:{
        type: DataTypes.DATE,
        primaryKey: true
    },
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    orgNif:{
        type: DataTypes.STRING
    },
    actPlace:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "PeriodicAct" model
export default PeriodicAct;