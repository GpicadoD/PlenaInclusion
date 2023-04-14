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
