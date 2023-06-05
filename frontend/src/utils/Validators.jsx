const validateFirstName = (firstName) => {
    return firstName?.toString().length >= 4;
}

const validateLastName = (lastName) => {
    return lastName?.toString().length >= 4;
}

const validateUsername = (username) => {
    return username?.toString().length >= 4;
}

const validateEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.');
}

const validatePassword = (password) => {
    return password?.toString().length > 1;
}

const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword?.toString().length > 1;
}

const validateTextPost = (text) => {
    return text?.toString().length > 1;
}

export {
    validateFirstName,
    validateLastName,
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateTextPost
}