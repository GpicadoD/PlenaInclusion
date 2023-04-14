import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Organizer from "./organizerModel.js";

import newActivities from "./newActivityModel.js";

const {DataTypes} = Sequelize;

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
    freezeTableName: true
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
(async () => {
    await db.sync();
})();

export default PeriodicAct;