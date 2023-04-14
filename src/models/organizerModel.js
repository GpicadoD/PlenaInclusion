import { Sequelize } from "sequelize";
import db from "../config/database.js";

import newActivities from "./newActivityModel.js";

const {DataTypes} = Sequelize;

const Organizer = db.define('organizer', {
    NifOrg:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    idImgOrg:{
        type: DataTypes.INTEGER
    },
    idtypeProf:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

Organizer.belongsTo(newActivities, { through: newActivities });

export default Organizer;