// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
// It also imports the "Competitor" and the "periodicActivities" models previously defined.
import PeriodicAct from "../models/periodicActivityModel.js";

const {DataTypes} = Sequelize;

// Define the "CompAct" model using Sequelize
const CompAct = db.define("CompActs", {
    activityId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true
    },
    NifCom:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        primaryKey: true
    },
    
    ActDate:{
        type: DataTypes.DATE,
        foreignKey: true,
        primaryKey: true
    }
}, { timestamps: false,
    onDelete : false
});
// Export the CompAct" model
PeriodicAct.belongsToMany(Competitor, {
    through: {
    model: CompAct,
    unique: false,
    },
    foreignKey: 'activityId'
});

Competitor.belongsToMany(PeriodicAct, {
    through: {
    model: CompAct,
    unique: false
    },
    foreignKey: 'NifCom'
});
CompAct.hasMany(Competitor, {
    foreignKey: 'NifCom'
}); 
Competitor.belongsTo(CompAct, {
    foreignKey: 'NifCom',
    targetKey: 'NifCom',
});
CompAct.hasMany(PeriodicAct, {
    foreignKey: 'activityId'
}); 
PeriodicAct.belongsTo(CompAct, {
    foreignKey: 'activityId',
    targetKey: 'activityId',
});
PeriodicAct.belongsTo(CompAct, {
    foreignKey: 'actDate',
    targetKey: 'ActDate',
});

export default CompAct;