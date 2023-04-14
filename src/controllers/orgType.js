
// This code imports the "OrgType" model from its respective module
import OrgType from "../models/orgTypeModel.js";

export const GetorgType  = async(req, res) => {
    try {
        let Data = await OrgType.findAll();
        res.json(Data);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateOrgType = async(req, res) => {
    var {idTypeOrg, orgType} = req.body;
    
    if(!idTypeOrg) return res.status(400).json({msg: "Cant update an activity without an ID"});
    try {
        const orgTypeM = await OrgType.findByPk(idTypeOrg);
        
        if(!orgType) orgType  = orgTypeM.orgType;
        orgTypeM.set({
            orgType: orgType
        });
        await orgTypeM.save();
        res.json({msg: "Organizer Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const AddorgType = async (req, res) => {
    var { idTypeOrg, orgType } = req.body;
    if(!idTypeOrg) return res.status(400).json({msg: "Cant update without PK"});

    try {
      await OrgType.create({
        idTypeOrg,
        orgType,
      });
      res.json({ msg: "Organization type created successfully" });
    } catch (error) {
      console.log(error);
    }
  };

