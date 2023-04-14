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
    freezeTableName: true
});

(async () => {
    await db.sync();
})();
ImgAct.belongsTo(newActivities, { through: newActivities });
export default ImgAct;