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

export const AddNewUser = async(req, res) => {
    var { userNIF, name, lastname, email, birthdate, phoneNumber, password, gender } = req.body;
    if(!userNIF) return res.status(400).json({msg: "Cant update without PK"});

    try {
      await newUsers.create({
        userNIF: userNIF,
        name: name,
        lastname: lastname,
        email: email,
        birthdate: birthdate,
        phoneNumber: phoneNumber,
        password: password,
        gender: gender
      });
  
      res.json({ msg: "User added successfully" });
    } catch (error) {
      console.log(error);
    }
  }
  