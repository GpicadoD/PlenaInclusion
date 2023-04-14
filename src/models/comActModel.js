import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Competitor from "../models/competitorModel.js";
import PeriodicAct from "../models/periodicActivityModel.js";
const {DataTypes} = Sequelize;

const CompAct = db.define('compact', {
}, { timestamps: false });
Competitor.belongsToMany(PeriodicAct, { through: CompAct });
PeriodicAct.belongsToMany( Competitor, { through: CompAct });

export default CompAct;