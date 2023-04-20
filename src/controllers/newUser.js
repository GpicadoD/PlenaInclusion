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


// This code defines a controller function called "UpdateUser" that updates an existing user in the database based on the provided userNIF (primary key)
// If any properties are not provided in the request body, they will default to the current values stored in the database
=======
// This code defines a controller function called "UpdateUser" that updates the User's nif, lastname, email, birthdate, phonenumber, password and gender from the request body
// It then uses the "findByPk" method to find the corresponding userNIF record in the database
// The method request's searches if the characteristics of the user are the same or not in the list to change it
export const DeleteNewUser = async(req, res) => {
    const { userNIF } = req.body;
    console.log(userNIF);
    try {
        let newUser = await newUsers.findByPk(userNIF);
        console.log(newUser);
        if(!newUser){
            return res.json({msg: "newUser not found"});  
        } 
        else{
            if(newUser.userNIF == userNIF){
            await newUser.destroy();
          
            return res.json({msg: "newUser successfully delete"});  
            } 
        }
    }   
    catch (error) {
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

// This code defines a controller function called "AddNewUser" that adds a new user to the database with the provided properties
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

