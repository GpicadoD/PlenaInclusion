// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
// Define the "ImgOrg" model using Sequelize
const ImgOrg = db.define('imgOrg', {
    idImgOrg:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ImgOrg:{
        type: DataTypes.BLOB
    }
},{
    freezeTableName: true,
    timestamps: false
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "ImgOrg" model
export default ImgOrg;