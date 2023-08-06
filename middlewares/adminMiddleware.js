
const usermodel = require("../models/usermodel");
module.exports = async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.body.userId);
    //check admin
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "AUth Failed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};