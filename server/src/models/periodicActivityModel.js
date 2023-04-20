<<<<<<< HEAD:src/models/periodicActivityModel.js
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
        primaryKey: true
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
=======
// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Organizer from "./organizerModel.js";

import newActivities from "./newActivityModel.js";

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
    NifOrg:{
        type: DataTypes.STRING
    },
    actPlace:{
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
>>>>>>> 812b6b3e7ef4916424ae070e54c3e28a9c206302:server/src/models/periodicActivityModel.js
export default PeriodicAct;