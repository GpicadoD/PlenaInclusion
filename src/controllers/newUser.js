// This code imports the "newUsers" model from its respective module, as well as the "bcrypt" library
import newUsers from "../models/newUserModel.js";

import bcrypt, { compare } from "bcrypt";

// This code defines a controller function called "GetNewUser" that uses the "findAll" method to retrieve all new users from the database
// It then sends the usersData data as a JSON response to the client
export const GetNewUser = async(req, res) => {
    try {
        let usersData = await newUsers.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}