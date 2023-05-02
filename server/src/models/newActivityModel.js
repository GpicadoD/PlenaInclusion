// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";
import ImgAct from "./imgActModel.js";
import CompAct from "./comActModel.js";
// It also imports the "CompAct" model previously defined.
import Theme from "./themeModel.js";
import PublicType from "./publicModel.js";
import Period from "./periodModel.js";
import Organizer from "./organizerModel.js";

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
    idPublicType:{
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
        type: DataTypes.STRING
    },
    Description:{
        type: DataTypes.STRING
    },
    Limit:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
});

Theme.hasMany(newActivities, {
    foreignKey: 'idTheme'
});
newActivities.belongsTo(Theme, {
    foreignKey: 'idTheme',
    targetKey: 'idTheme'
});

Period.hasMany(newActivities, {
    foreignKey: 'idPeriod'
});
newActivities.belongsTo(Period, {
    foreignKey: 'idPeriod',
    targetKey: 'idPeriod',
});

PublicType.hasMany(newActivities, {
    foreignKey: 'idPublicType'
}); 
newActivities.belongsTo(PublicType, {
    foreignKey: 'idPublicType',
    targetKey: 'idPublicType',
});

Organizer.hasMany(newActivities, {
    foreignKey: 'idCreator'
}); 
newActivities.belongsTo(Organizer, {
    foreignKey: 'idCreator',
    targetKey: 'NifOrg',
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