import { Sequelize } from "sequelize";
import db from "../config/database.js";

import CompAct from "./comActModel.js";
import Theme from "./themeModel.js";
import PublicType from "./publicModel.js";
import Period from "./periodModel.js";
import Organizer from "./organizerModel.js";
import ImgAct from "./imgActModel.js";


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
        type: DataTypes.INTEGER
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
  }
);

Period.hasMany(newActivities, {
    foreignKey: 'idPeriod'
});
newActivities.belongsTo(Period, {
    foreignKey: 'idPeriod',
    targetKey: 'idPeriod',
  }
);

PublicType.hasMany(newActivities, {
    foreignKey: 'idPublicType'
}); 
newActivities.belongsTo(PublicType, {
    foreignKey: 'idPublicType',
    targetKey: 'idPublicType',
  }
);

Organizer.hasMany(newActivities, {
    foreignKey: 'idCreator'
}); 
newActivities.belongsTo(Organizer, {
    foreignKey: 'idCreator',
    targetKey: 'NifOrg',
  }
);

ImgAct.hasMany(newActivities, {
    foreignKey: 'idImgAct'
}); 
newActivities.belongsTo(ImgAct, {
    foreignKey: 'idImgAct',
    targetKey: 'idImgAct',
  });
// Synchronize the model with the database
(async () => {
    await db.sync();
})();

// Export the "Activities" model
export default newActivities;