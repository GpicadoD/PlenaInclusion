import OrgType from "../models/orgTypeModel.js";


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