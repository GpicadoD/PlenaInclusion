import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
import Activities from "./activityModel.js";

const { DataTypes } = Sequelize;

const UserActs = db.define('UserActs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  activityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activities,
      key: 'id'
    }
  }
});

Users.belongsToMany(Activities, { through: UserActs });
Activities.belongsToMany(Users, { through: UserActs });

export default UserActs;