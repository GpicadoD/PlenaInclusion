// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ImgOrg from "./imgOrgModel.js";

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
    idtypeProf:{
        type: DataTypes.INTEGER
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

// Synchronize the model with the database
(async () => {
    await db.sync();
})();

// Export the "Organizer" model
export default Organizer;