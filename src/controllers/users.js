//Imports the "Users" model from the "userModel.js" module, as well as the "bcrypt" library
import Users from "../models/userModel.js";
import bcrypt, { compare } from "bcrypt";

// This code defines a controller function called "GetUsers" that retrieves all user records from the database using the "findAll" method
// It then sends the user data as a JSON response to the client

export const GetUsers  = async(req, res) => {
    try {
        let usersData = await Users.findAll();
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "Register" that extracts the username, password, and confirmation password from the request body
// It then checks that the username is not null and that the password matches the confirmation password
// It generates a salt using the "genSalt" method and hashes the password using the "hash" method
// It then creates a new user record in the database using the "create" method and sends a JSON response indicating success or failure
export const Register = async(req, res) => {
    const {username, password, confPassword} = req.body;
    if(username == null) return res.status(400).json({msg: "Write the username"});
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: username,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "GetUsersPassHash" that extracts the username and password from the request body
// It uses the "findOne" method to find the user record in the database with the specified username
// If the user is not found, it sends a 404 error response
// If the user is found, it checks the password hash using the "compare" method
// If the password is invalid, it sends an error message
// If the password is valid, it sends a success message
export const GetUsersPassHash  = async(req, res) => {
    const {username, password} = req.body;
    try {
        let users = await Users.findOne ({username});
        debugger;
        console.log(users)
        if(users.name != username){
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
            users = null;

        }
    } catch (error) {
        console.log(error);
    }
}