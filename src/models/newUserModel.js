// It first imports the Sequelize library and the database configuration.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
// Define the "Users" model using Sequelize
const newUsers = db.define('newusers', {
    userNIF:{
        type: DataTypes.INTEGER,
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
    freezeTableName: true,
    timestamps: false
});
// Synchronize the model with the database
(async () => {
    await db.sync();
})();
// Export the "Users" model
export default newUsers;