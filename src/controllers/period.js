import Period from "../models/periodModel.js";

export const addNewPeriod = async (req, res) => {
    var { period } = req.body;
    if(!period) return res.status(400).json({msg: "Cant update without PK"});

    console.log(period)
    try {
      await Period.create({
        period,
      });
      res.json({ msg: "Period created successfully" });
    } catch (error) {
      console.log(error);
    }
  };

