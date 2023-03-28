import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";

const UserActs = db.define('userActs', {
}, { timestamps: false });

Users.belongsToMany(Activities, { through: UserActs });
Activities.belongsToMany( Users, { through: UserActs });

export default UserActs;