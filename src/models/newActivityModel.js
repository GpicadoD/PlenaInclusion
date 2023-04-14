import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ImgAct from "./imgActModel.js";
import CompAct from "./comActModel.js";

import Theme from "./themeModel.js";

const {DataTypes} = Sequelize;
// Define the "Activities" model using Sequelize
const newActivities = db.define('newactivities', {
    activityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameAct:{
        type: DataTypes.STRING
    },
    public:{
        type: DataTypes.INTEGER
    },
    idTheme:{
        type: DataTypes.INTEGER
    },
    idImgAct:{
        type: DataTypes.INTEGER,
        foreignKey : true
    },
    startDate:{
        type: DataTypes.DATE
    },
    finishDate:{
        type: DataTypes.DATE
    },
    idPeriod:{
        type: DataTypes.INTEGER
    },
    idCreator:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

ImgAct.hasMany(newActivities, {
    foreignKey: 'idImgAct'
}); 
newActivities.belongsTo(ImgAct, {
    foreignKey: 'idImgAct',
    targetKey: 'idImgAct',
  });

Theme.hasMany(newActivities, { 
    foreignKey: 'idTheme'
 });
newActivities.belongsTo(Theme, {
    foreignKey: 'idTheme',
    targetKey:'idTheme'
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();


// Export the "Activities" model
export default newActivities;