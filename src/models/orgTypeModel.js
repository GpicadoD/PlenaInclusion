// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Organizer from "./organizerModel.js";
// It also imports the "organizer" model previously defined.

const {DataTypes} = Sequelize;
// Define the "orgType" model using Sequelize
const OrgType = db.define('orgType', {
    idTypeOrg:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    orgType:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

OrgType.belongsTo(Organizer, { through: Organizer });
// Export the "orgType" model
export default OrgType;