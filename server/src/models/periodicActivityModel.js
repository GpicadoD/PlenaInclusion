// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Organizer from "./organizerModel.js";

import newActivities from "./newActivityModel.js";

const {DataTypes} = Sequelize;
// Define the "PeriodicAct" model using Sequelize
const PeriodicAct = db.define('periodicAct', {
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    actDate:{
        type: DataTypes.DATE,
        primaryKey: true
    },
    NifOrg:{
        type: DataTypes.STRING
    },
    actPlace:{
        type: DataTypes.STRING
    },
    Duration:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});
Organizer.hasMany(PeriodicAct, {
    foreignKey: 'NifOrg'
}); 
PeriodicAct.belongsTo(Organizer, {
    foreignKey: 'NifOrg',
    targetKey: 'NifOrg',
});

newActivities.hasMany(PeriodicAct, {
    foreignKey: 'activityId'
}); 
PeriodicAct.belongsTo(newActivities, {
    foreignKey: 'activityId',
    targetKey: 'activityId',
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "PeriodicAct" model
export default PeriodicAct;