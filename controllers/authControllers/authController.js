const passport = require('../../middlewares/passport');
const User = require('../../models/userModels/userModel');
const bcrypt = require('bcrypt');

let errorMsg = "";

const authController = (req, res) => {
    res.send("Welcome to auth route for signup page goes to /signUp...");
}

const signUpAuthController = (req, res) => {
    res.render("auth-signUp");
}
const signInAuthController = (req, res) => {
    res.render("auth-signIn", { errorMsg });
    errorMsg = "";
}

const registerController = async (req, res) => {
    try {

        let { name, email, password } = req.body;

        let hashPass = await bcrypt.hash(password, 12);

        const user = await User({
            name,
            email,
            password: hashPass,
        });

        await user.save();

        res.redirect("/auth/signIn");

    } catch (err) {
        console.log("Something went wrong...", err);
    }
}

const loginController = async (req, res) => {

    passport.authenticate("local", (err, user, info) => {
        if (info && info.message == "User not found") {

            return res.redirect("/auth/signUp");

        } else if (info && info.message == "Password not match") {

            errorMsg = "Password does not match";
            return res.redirect("/auth/signIn");

        } else if (!info && user) {

            req.logIn(user, (err) => {
                return res.redirect("/dashboard");
            });

        }
    })(req, res);

}

const logOutController = (req, res) => {

    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("/auth/signIn");
    });

}

module.exports = {
    authController,
    signUpAuthController,
    signInAuthController,
    registerController,
    loginController,
    logOutController
}