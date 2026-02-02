const mongoose = require("mongoose");
const UserModel = require("../schema/auth.schema");

const getAllUsers = async ({ user_id, search }) => {
  try {

    const findAllUser = await UserModel.find({
      _id: { $ne: new mongoose.Types.ObjectId(user_id) },
      $or: [
        { name: { $regex: search, $options: "i" } },
        // { email: { $regex: search, $options: "i" } }
      ]
    }).select("-password");

    if (findAllUser.length)
      return { message: 'All User Fetched...', status: true, code: 200, data: findAllUser };

    return { message: 'No user found', status: true, code: 200, data: [] };

  } catch (error) {
    console.log(error);
    return { message: error.message, code: 400, status: false };
  }
};

module.exports = {getAllUsers}
