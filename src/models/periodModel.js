import { Sequelize } from "sequelize";
import db from "../config/database.js";
import newActivities from "./newActivityModel.js";
const {DataTypes} = Sequelize;
const Period = db.define('period', {
    idPeriod:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    period:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});
(async () => {
    await db.sync();
})();
export default Period;