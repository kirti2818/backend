const { getAllUsers } = require("../controller/user.controller");

const getAllUserService = async (req, res) => {
    try {
        const user_id = req.user_id
        const search = req.query?.search
        const data = await getAllUsers({ user_id, search })
        if (data) return res.json({ message: data.message, status: data.status, data : data.data }).status(data.code)

    } catch (error) {

        return res.json({ message: error.message, status: false }).status(400)

    }
}

module.exports = { getAllUserService }