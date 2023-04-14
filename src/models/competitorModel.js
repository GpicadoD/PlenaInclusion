import { Sequelize } from "sequelize";
import db from "../config/database.js";
import newUsers from "./newUserModel.js";

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
    freezeTableName: true
});

newUsers.hasOne(Competitor, { 
    foreignKey: 'NifCom'
 });
 Competitor.belongsTo(newUsers, {
    foreignKey: 'NifCom'
 });
 
(async () => {
    await db.sync();
})();

export default Competitor;