const { signupController, loginController, verifyOtpController, resendOtpController } = require("../controller/auth.controller");
const cookieOption = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite:'none',
    secure: true,
};

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
        if (!data.token) return res.status(data.code).json({ message: data.message, status: data.status })
        return res.cookie('token', data.token, cookieOption).status(data.code).json({ message: data.message, status: data.status, token: data.token })

    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })
    }
}

const verify_otp = async (req, res) => {
    try {
        const body = req.body;
        if (!body) return res.status(400).json({ message: 'Please Fill All Fields', status: false })
        const user_id = req.user_id
        const data = await verifyOtpController({ ...body, user_id })
        if (!data.token) {
            return res.status(data.code).json({ message: data.message, status: data.status })
        }
        return res.cookie('token', data.token, cookieOption).status(data.code).json({ message: 'Otp Verified Successfully', status: true, token: data.token })


    } catch (error) {
        console.log(error.message, 'ERROR MESSAGE')
        return res.status(400).json({ message: error.message, status: false })

    }
}

const resend_otp = async (req, res) => {
    try {
        const user_id = req.user_id
        const data = await resendOtpController({ user_id })
        return res.status(data.code).json({ message: data.message, status: data.status })

    } catch (error) {
        return res.status(400).json({ message: error.message, status: false })

    }
}

module.exports = { signup, login, verify_otp, resend_otp }