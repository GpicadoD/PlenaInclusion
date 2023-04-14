import PublicType from "../models/publicModel.js";

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