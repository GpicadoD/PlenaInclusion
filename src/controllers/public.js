// This code imports the "Public" model from its respective module
import PublicType from "../models/publicModel.js";

// This code defines a controller function called "Getpublic" that uses the "findAll" method to retrieve all PublicTypes from the database
// It then sends the publicType data as a JSON response to the client
export const Getpublic  = async(req, res) => {
    try {
        let Data = await PublicType.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}


// This code defines a controller function called "UpdatePublic" that extracts the id of the publicType and the new publicType from the request body
// It then searches the publicType by the PK from the "PublicType" model and updates it with the new publicType data
// It then sends a JSON response indicating success or failure
export const DeletePublic = async(req, res) => {
    const { idPublic } = req.body;
    try {
        let publics = await PublicType.findByPk(idPublic);
        console.log(publics);
        if(publics == null){
            return res.json({msg: "public not found"});  
        } 
        else{
            if(publics.idPublicType == idPublic){
            await publics.destroy();
            return res.json({msg: "public successfully delete"});  
            } 
        }
    } 
    catch (error) {
        console.log(error);
    }
}
export const UpdatePublic = async(req, res) => {
    var {idPublicType, publicType} = req.body;
    
    if(!idPublicType) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const Public = await PublicType.findByPk(idPublicType);
        
        if(!publicType) publicType  = Public.publicType;
        Public.set({
            publicType: publicType
        });
        await Public.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

// This code defines a controller function called "Addnewpublic" that extracts the id of the publicType and the name of the new publicType from the request body
// If the idPublicType field is not missing, it creates a new PublicType record in the database with the provided data and sends a JSON response indicating success or failure
export const Addnewpublic = async (req, res) => {
    var { idPublicType, publicType } = req.body;
    console.log(idPublicType);
    if(!idPublicType) return res.status(400).json({msg: "Cant update without PK"});

    try {
      await PublicType.create({
        idPublic : idPublicType,
        publicType: publicType
      });
      res.json({ msg: "Public created successfully" });
    } catch (error) {
      console.log(error);
    }
  };
