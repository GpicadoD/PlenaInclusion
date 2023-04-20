<<<<<<< HEAD:src/models/comActModel.js
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
        primaryKey: true
    }
}, { timestamps: false,
    ondelete : false
 });
// Export the CompAct" model
Competitor.belongsToMany(PeriodicAct, { through: CompAct, foreignKey: 'activityId', targetKey: 'activityId',});
PeriodicAct.belongsToMany( Competitor, { through: CompAct, foreignKey: 'NifCom', targetKey: 'NifCom',});
export default CompAct; 
=======
// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
// It also imports the "Competitor" and the "periodicActivities" models previously defined.
import PeriodicAct from "../models/periodicActivityModel.js";
const {DataTypes} = Sequelize;
// Define the "CompAct" model using Sequelize
const CompAct = db.define('compact', {
}, { timestamps: false });
// Export the CompAct" model
Competitor.belongsToMany(PeriodicAct, { through: CompAct });
PeriodicAct.belongsToMany( Competitor, { through: CompAct });
export default CompAct;
>>>>>>> 812b6b3e7ef4916424ae070e54c3e28a9c206302:server/src/models/comActModel.js
