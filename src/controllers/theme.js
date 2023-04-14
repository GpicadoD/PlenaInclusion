import Theme from '../models/themeModel.js';

export const Addnewtheme = async (req, res) => {
  var { idTheme, themeName } = req.body;
  if(!idTheme) return res.status(400).json({msg: "Cant update without PK"});

  try {
    await Theme.create({
      idTheme,
      themeName,
    });
    res.json({ msg: "Theme created successfully" });
  } catch (error) {
    console.log(error);
  }
};