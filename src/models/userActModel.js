import { Sequelize } from "sequelize";
import db from "../config/database.js";

export const User = sequelize.define('Users', { name: DataTypes.STRING });
export const Activity = sequelize.define('Activities', { name: DataTypes.STRING });
const UserActs = sequelize.define('UserActs', {
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  ActivityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activity,
      key: 'id'
    }
  }
});
User.belongsToMany(User, { through: UserActs });
Activity.belongsToMany(Activity, { through: UserActs });