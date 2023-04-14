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

// This code defines a controller function called "UpdateUser" that updates the User's nif, lastname, email, birthdate, phonenumber, password and gender from the request body
// It then uses the "findByPk" method to find the corresponding userNIF record in the database
// The method request's searches if the characteristics of the user are the same or not in the list to change it
export const UpdateUser = async(req, res) => {
    var {userNIF, name, lastname, email, birthdate, phoneNumber,
        password, gender} = req.body;
    
    if(!userNIF) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const user = await newUsers.findByPk(userNIF);
        if(!name) name  = user.name;
        if(!lastname) lastname  = user.lastname;
        if(!email) email  = user.email;
        if(!birthdate) birthdate  = user.birthdate;
        if(!phoneNumber) phoneNumber  = user.phoneNumber;
        if(!password) password  = user.password;
        if(!gender) gender  = user.gender;
        user.set({
            name: name,
            lastname: lastname,
            email: email,
            birthdate: birthdate,
            phoneNumber: phoneNumber,
            password: password,
            gender: gender
        });
        await user.save();
        res.json({msg: "user Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}