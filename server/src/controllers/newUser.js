// This code imports the "newUsers" model from its respective module, as well as the "bcrypt" library
import newUsers from "../models/newUserModel.js";

import bcrypt from "bcrypt";

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
    var { userNIF, name, lastname, email, birthdate, phoneNumber, password, gender,confPassword } = req.body;
    if(!userNIF) return res.status(400).json({msg: "Cant update without PK"});
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await newUsers.create({
        userNIF: userNIF,
        name: name,
        lastname: lastname,
        email: email,
        birthdate: birthdate,
        phoneNumber: phoneNumber,
        password: hashPassword,
        gender: gender
      });
  
      res.json({ msg: "User added successfully" });
    } catch (error) {
      console.log(error);
    }
  }


export const ResetPassword = async(req, res) => {
    var { newUserNif } = req.body;
    const bank = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789:._";
    var randomPass = "";
    for (let i = 0; i < 7; i++) {
        randomPass += bank.charAt(Math.floor(Math.random() * bank.length));
    }
    if(!newUserNif) return res.status(400).json({msg: "Cant update an activity without an ID"});
    const salt = await bcrypt.genSalt();
    try {
        const user = await newUsers.findByPk(newUserNif);
        var password = await bcrypt.hash(randomPass, salt);
        user.set({
            password: password
        });
        await user.save();
        res.json({msg: "The new password is: " + randomPass});
    } catch (error) {
        console.log(error);
    }
}

export const Login  = async(req, res) => {
    const {newUserNif, password} = req.body;
    console.log(newUserNif);
    try {
        let users = await newUsers.findByPk(newUserNif);
        if(users.userNIF != newUserNif){
            res.status(404);
            res.json({msg: "User Not found"});
            return;
        } else {
            const checkPass = await bcrypt.compare(password, users.password);

            if(!checkPass){
                res.json({msg: "Invalid Password"});
            } else {
                res.json({msg: "Logged Succesfully"});
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const UpdatePassword  = async(req, res) => {
    var {newUserNif, actualUserPass, newUserPass, repeat_newUserPass} = req.body;
    try {
        const users = await newUsers.findByPk(newUserNif);
        if(users.userNIF != newUserNif){
            res.status(404);
            res.json({msg: "User Not found"});
            return;
        } else {
            const checkPass = await bcrypt.compare(actualUserPass, users.password);
            if(!checkPass){
                res.json({msg: "Invalid Password"});
            } else if (newUserPass == repeat_newUserPass) {
                const salt = await bcrypt.genSalt();
                newUserPass = await bcrypt.hash(newUserPass, salt);
                users.set({
                    password: newUserPass
                });
                await users.save();
                res.json({msg: "Password Updated"});
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const RegisterNewUser = async(req, res) => {
    var { userNIF, name, lastname, email, birthdate, phoneNumber, gender } = req.body;

    if(!userNIF) return res.status(400).json({msg: "Cant update without PK"});

    const salt = await bcrypt.genSalt();

    const bank = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789:._";
    var randomPass = "";
    for (let i = 0; i < 7; i++) {
        randomPass += bank.charAt(Math.floor(Math.random() * bank.length));
    }

    const hashPassword = await bcrypt.hash(randomPass, salt);

    try {
    
      await newUsers.create({
        userNIF: userNIF,
        name: name,
        lastname: lastname,
        email: email,
        birthdate: birthdate,
        phoneNumber: phoneNumber,
        password: hashPassword,
        gender: gender
      });
  
      res.json({ randomPass});
    } catch (error) {
      console.log(error);
    }
}