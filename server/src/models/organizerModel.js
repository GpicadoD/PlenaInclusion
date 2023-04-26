// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ImgOrg from "./imgOrgModel.js";
import OrgType from "../models/orgTypeModel.js";

const {DataTypes} = Sequelize;
// Define the "Organizer" model using Sequelize
const Organizer = db.define('organizer', {
    NifOrg:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    idImgOrg:{
        type: DataTypes.INTEGER,
        foreignKey:true
    },
    idTypeOrg:{
        type: DataTypes.INTEGER,
        foreignKey:true
    }
},{
    freezeTableName: true,
    timestamps: false
});
ImgOrg.hasMany(Organizer, {
    foreignKey: 'idImgOrg'
}); 
Organizer.belongsTo(ImgOrg, {
    foreignKey: 'idImgOrg',
    targetKey: 'idImgOrg',
  });

OrgType.hasOne(Organizer, { 
    foreignKey: 'idTypeOrg'
}); 
Organizer.belongsTo(OrgType, {
    foreignKey: 'idTypeOrg',
    targetKey: 'idTypeOrg',
});

// Synchronize the model with the database
(async () => {
    await db.sync();
})();

// Export the "Organizer" model
export default Organizer;