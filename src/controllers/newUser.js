import newUsers from "../models/newUserModel.js";

import bcrypt, { compare } from "bcrypt";

export const GetNewUser = async(req, res) => {
    try {
        let usersData = await newUsers.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}