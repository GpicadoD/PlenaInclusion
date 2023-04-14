import { Sequelize } from "sequelize";
import db from "../config/database.js";
import newActivities from "./newActivityModel.js";
const {DataTypes} = Sequelize;
const PublicType = db.define('publicType', {
    idPublicType:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicType:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default PublicType;