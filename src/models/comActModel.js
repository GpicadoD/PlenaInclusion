import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
import newActivities from "../models/newActivityModel.js";


const CompAct = db.define('compact', {
}, { timestamps: false });
Competitor.belongsToMany(newActivities, { through: CompAct });
newActivities.belongsToMany( Competitor, { through: CompAct });

export default CompAct;