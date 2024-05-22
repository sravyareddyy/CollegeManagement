function Validation(values, isSignUp) {
    let errors = {};

    if (isSignUp) {
        if (!values.username || values.username.trim() === "") {
            errors.username = "Username should not be empty";
        } else if (values.username.length < 4) {
            errors.username = "Username should be at least 4 characters";
        } else {
            errors.username = "";
        }

        if (!values.emailid || values.emailid.trim() === "") {
            errors.emailid = "Email should not be empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailid)) {
            errors.emailid = "Please enter a valid email address";
        } else {
            errors.emailid = "";
        }
    } else {
        if (!values.username || values.username.trim() === "") {
            errors.username = "Username should not be empty";
        } else {
            errors.username = "";
        }
    }

    if (!values.password || values.password.trim() === "") {
        errors.password = "Password should not be empty";
    } else if (values.password.length < 8) {
        errors.password = "Password should be at least 8 characters";
    } else {
        errors.password = "";
    }

    return errors;
}

export default Validation;
