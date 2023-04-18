// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
// It also imports the "Competitor" and the "periodicActivities" models previously defined.
import PeriodicAct from "../models/periodicActivityModel.js";
const {DataTypes} = Sequelize;
// Define the "CompAct" model using Sequelize
const CompAct = db.define('compact', {
}, { timestamps: false
 });
// Export the CompAct" model
Competitor.belongsToMany(PeriodicAct, { through: CompAct });
PeriodicAct.belongsToMany( Competitor, { through: CompAct });
export default CompAct;