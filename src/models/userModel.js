//This code is importing Sequelize and a database instance from a separate file.
import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;
//It is then defining a new model, `Users`, using `db.define()` method, which takes two arguments: a name for the model and an object that defines the fields and their data types.
//The `Users` model has three fields: `userId`, `name`, and `password`. `userId` is set as the primary key and auto-incrementing using the `type`, `primaryKey`, and `autoIncrement` properties. The `name` and `password` fields are set to `DataTypes.STRING` to store string values.
const Users = db.define('users', {
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
// An anonymous async function is called immediately and syncs the database with `await db.sync();`
(async () => {
    await db.sync();
})();
// Finally, the `Users` model is exported using the `export default` statement.
export default Users;
