import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
const {DataTypes} = Sequelize;

const Public = db.define('public', {
    idPublic:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    public:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

Public.belongsTo(newActivities, { through: newActivities });
export default Public;