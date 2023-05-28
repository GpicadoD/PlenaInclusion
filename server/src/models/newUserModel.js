// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

import Organizer from "./organizerModel.js";
import Competitor from "./competitorModel.js";

const {DataTypes} = Sequelize;
// Define the "Users" model using Sequelize
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
    },
    refreshToken:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
});
newUsers.hasOne(Organizer, { 
    foreignKey: 'NifOrg'
});
Organizer.belongsTo(newUsers, {
    foreignKey: 'NifOrg'
});

// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "Users" model
export default newUsers;