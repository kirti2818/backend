const generateOtp = (length=4)=>{
    let otp = ''
    for (let i=0;i<length;i++){
        otp = otp + Math.floor(Math.random()*10)

    }
    console.log('OTP',otp)
    return otp;
}

module.exports = generateOtp