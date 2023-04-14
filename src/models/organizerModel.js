import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";
import ImgOrg from "./imgOrgModel.js";
import newUsers from "./newUserModel.js";
const {DataTypes} = Sequelize;

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
    freezeTableName: true
});
ImgOrg.hasMany(Organizer, {
    foreignKey: 'idImgOrg'
}); 
Organizer.belongsTo(ImgOrg, {
    foreignKey: 'idImgOrg',
    targetKey: 'idImgOrg',
  });

(async () => {
    await db.sync();
})();

export default Organizer;