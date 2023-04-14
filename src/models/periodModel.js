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
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

Period.belongsTo(newActivities, { through: newActivities });

export default Period;