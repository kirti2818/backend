const { signupController, loginController } = require("../controller/auth.controller");

const signup = async (req, res) => {
    try {
        const body = req.body
        if (!body) return res.status(400).json({ message: 'Please Provide Data', status: false })
        const data = await signupController(body)
        return res.status(data.code).json({ message: data.message, status: data.status })
    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })
    }
}

const login = async (req, res) => {
    try {
        const body = req.body;
        if (!body) return res.status(400).json({ message: 'Please Provide Data', status: false })
        const data = await loginController(body)
        return res.cookie('token', data.token, {
            maxAge: 60000, // Cookie valid for 1 hour (in milliseconds)
            httpOnly: true, // Not accessible by client-side JS
            // secure: true,   // Only sent over HTTPS
            // sameSite: 'Strict' // Controls cross-site behavior
        }).status(data.code).json({ message: data.message, status: data.status })

    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })
    }
}

module.exports = { signup, login }