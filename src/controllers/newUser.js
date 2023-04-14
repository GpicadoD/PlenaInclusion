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