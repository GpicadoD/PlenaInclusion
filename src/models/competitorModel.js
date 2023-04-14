import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Competitor = db.define('competitor', {
    NifCom:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    emergencyNumber:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default Competitor;