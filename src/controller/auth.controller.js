const UserModel = require('../schema/auth.schema')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/GenerateToken');

const signupController = async (data) => {
    try {
        const { name, email, user_name, password } = data;
        if (!name || !user_name || !email || !password) return { message: 'Please Fill All Fields', status: false, code: 400 }

        const isUserExist = await UserModel.findOne({ $or: [{ email }, { user_name }] })
        if (isUserExist) return { message: "User Already Exist!", status: false, code: 400 }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insert_user = new UserModel({ name, user_name, email, password: hashedPassword })
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
        const token = generateToken({email : isUserExist.email, name : isUserExist.name, id : isUserExist._id, is_email_verified : isUserExist.is_email_verified})
        return { message: 'Login Successfull', status: true, code: 200,token }

    } catch (error) {
        return { message: error.message, status: false, code: 400 }
    }
}

module.exports = { signupController, loginController }