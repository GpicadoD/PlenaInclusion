// This code defines a many-to-many relationship between the "Users" and "Activities" tables using the "userActs" table as the intermediary table.
// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
// It also imports the "Activities" and "Users" models previously defined.

import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";
// It then defines the "userActs" table with no columns, and disables automatic timestamps.
const UserActs = db.define('userActs', {
}, { timestamps: false });
// Finally, it sets up the many-to-many relationship between "Users" and "Activities" by using the "belongsToMany" method on both models, passing in the "UserActs" model as the through table.
Users.belongsToMany(Activities, { through: UserActs });
Activities.belongsToMany( Users, { through: UserActs });

export default UserActs;