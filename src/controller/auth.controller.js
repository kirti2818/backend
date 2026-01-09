const UserModel = require('../schema/auth.schema')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/GenerateToken');
const generateOtp = require('../utils/GenerateOtp');
const otpModel = require('../schema/otp.schema');
const dayjs = require('dayjs');
const mongoose = require('mongoose')

const signupController = async (data) => {
    try {
        const { name, email, user_name, password } = data;
        if (!name || !user_name || !email || !password) return { message: 'Please Fill All Fields', status: false, code: 400 }

        const isUserExist = await UserModel.findOne({ $or: [{ email }, { user_name }] })
        if (isUserExist) return { message: "User Already Exist!", status: false, code: 400 }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insert_user = new UserModel({ name, user_name, email, password: hashedPassword })
        await insert_user.validate()
        await insert_user.save()
        return { message: 'User Created Successfully', status: true, code: 200 }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }
    }
}


const loginController = async (data) => {
    try {
        const { detail, password } = data
        if (!detail || !password) return { message: 'Please Fill All Fields', status: false, code: 400 };
        const isUserExist = await UserModel.findOne({ $or: [{ email: detail }, { user_name: detail }] })
        if (!isUserExist) return { message: 'Invalid Credentials!', status: false, code: 400 }

        const comparePassword = await bcrypt.compare(password, isUserExist.password);
        if (!comparePassword) return { message: 'Wrong Password !', status: false, code: 400 }
        const token = generateToken({ email: isUserExist.email, user_name: isUserExist.user_name, id: isUserExist._id, is_email_verified: isUserExist.is_email_verified })

        if (!isUserExist.is_email_verified) {
            const otp = await generateOtp()
            //delete existing otp validate by user id
            await otpModel.deleteMany({ user_id: new mongoose.Types.ObjectId(isUserExist._id) })
            const saveOtp = new otpModel({ user_id: isUserExist._id, otp, expiry_date: dayjs().add(1, 'm').format() })
            await saveOtp.validate()
            await saveOtp.save()
            return { message: 'Login Successfull, OTP has been sent on your email', status: true, code: 200, token }

        }
        return { message: 'Login Successfull', status: true, code: 200, token }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }
    }
}

const verifyOtpController = async (data) => {
    try {
        const { otp, user_id } = data
        if (!otp) return ({ message: 'OTP is required !', status: false, code: 400 })
        const isOtpValid = await otpModel.findOne({ user_id: new mongoose.Types.ObjectId(user_id), otp })
        if (!isOtpValid) return { message: 'Wrong OTP !', status: false, code: 400 }
        const isOtpExpired = dayjs().format() > dayjs(isOtpValid.expiry_date).format()
        if (isOtpExpired) return { message: 'OTP Expired, Please Resend OTP !', status: false, code: 400 }
        await UserModel.findByIdAndUpdate(user_id, { is_email_verified: true }, { new: true })

        //delete existing otp validate by user id
        await otpModel.deleteMany({ user_id: new mongoose.Types.ObjectId(user_id) })
        const User = await UserModel.findById(user_id)
        const token = generateToken({ id: User._id, is_email_verified: User.is_email_verified, email: User.email, user_name: User.user_name })
        return { message: 'OTP verified Successfully!', status: true, code: 200, token }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }

    }
}

const resendOtpController = async (data) => {
    try {
        const { user_id } = data
        // delete all exiting otps validate by user id
        await otpModel.deleteMany({user_id})
        
        const otp = generateOtp()
        const saveOtp = new otpModel({ user_id, otp, expiry_date: dayjs().add(1, 'm').format() })
        await saveOtp.validate()
        await saveOtp.save()
        return { message: 'Resend OTP, Please Check email!', status: false, code: 200 }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }

    }
}

module.exports = { signupController, loginController, verifyOtpController, resendOtpController }