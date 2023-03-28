import {Sequelize} from "sequelize";

// npm install sequelize
// hay que cambiar la password a no password
const db = new Sequelize('tutorial_node', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    Port: '3306',
});

export default db;