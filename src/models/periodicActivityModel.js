import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const PeriodicAct = db.define('periodicAct', {
    actDate:{
        type: DataTypes.DATE,
        primaryKey: true
    },
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    orgNif:{
        type: DataTypes.STRING
    },
    actPlace:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default PeriodicAct;