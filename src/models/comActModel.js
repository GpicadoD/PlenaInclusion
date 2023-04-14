// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
import newActivities from "../models/newActivityModel.js";
// It also imports the "Competitor" and the "newActivities" models previously defined.

const {DataTypes} = Sequelize;
// Define the "CompAct" model using Sequelize
const CompAct = db.define('compact', {
}, { timestamps: false });
Competitor.belongsToMany(newActivities, { through: CompAct });
newActivities.belongsToMany( Competitor, { through: CompAct });
// Export the CompAct" model
export default CompAct;