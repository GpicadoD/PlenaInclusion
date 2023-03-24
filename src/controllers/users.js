import Users from "../models/userModel.js";
import bcrypt, { compare } from "bcrypt";

// npm install bcrypt

export const GetUsers  = async(req, res) => {
    try {
        let usersData = await Users.findAll({
            attributes:['id', 'name', 'password']
        });
        res.json(usersData);
    } catch (error) {
        console.log(error);
    }
}

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

export const GetUsersPassHash  = async(req, res) => {
    const {username, password} = req.body;
    try {
        let users = await Users.findOne ({username});
        debugger;
        console.log(users)
        if(users.name != username){
            res.status(404);
            res.json({msg: "Not user found"});
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