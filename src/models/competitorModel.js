// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import newUsers from "./newUserModel.js";

const {DataTypes} = Sequelize;
// Define the "Competitor" model using Sequelize
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

newUsers.hasOne(Competitor, { 
    foreignKey: 'NifCom'
 });
 Competitor.belongsTo(newUsers, {
    foreignKey: 'NifCom'
 });
 
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

// Export the "Competitor" model
export default Competitor;