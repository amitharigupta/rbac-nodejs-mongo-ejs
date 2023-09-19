const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashPassword = async (password) => {
    if(!password) return;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
    let isPasswordMatch = await bcrypt.compare(password, hashedPassword)
    return isPasswordMatch;
}

module.exports = {
    hashPassword,
    comparePassword
}