import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const ImgOrg = db.define('imgOrg', {
    idImgOrg:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ImgAct:{
        type: DataTypes.BLOB
    }
},{
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default ImgOrg;