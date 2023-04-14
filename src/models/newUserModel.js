import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Organizer from "./organizerModel.js";
import Competitor from "./competitorModel.js";

const {DataTypes} = Sequelize;

const newUsers = db.define('newusers', {
    userNIF:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING
    },
    lastname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    birthdate:{
        type: DataTypes.DATE
    },
    phoneNumber:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    gender:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 newUsers.hasOne(Organizer, { 
    foreignKey: 'NifOrg'
 });
 Organizer.belongsTo(newUsers, {
    foreignKey: 'NifOrg'
 });
 
 
 
(async () => {
    await db.sync();
})();

export default newUsers;