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
    freezeTableName: true,
    timestamps: false
});

(async () => {
    await db.sync();
})();

export default Organizer;