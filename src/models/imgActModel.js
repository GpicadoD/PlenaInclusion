import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
const {DataTypes} = Sequelize;

const ImgAct = db.define('imgAct', {
    idImgAct:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ImgAct:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();
export default ImgAct;