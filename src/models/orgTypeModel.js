import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Organizer from "./organizerModel.js";

const {DataTypes} = Sequelize;

const OrgType = db.define('orgType', {
    idTypeOrg:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    orgType:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

OrgType.belongsTo(Organizer, { through: Organizer });

export default OrgType;