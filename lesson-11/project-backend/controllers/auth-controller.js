import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../models/user.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError, sendEmail, createVerifyEmail } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationCode });

    const verifyEmail = createVerifyEmail({email, verificationCode});

    await sendEmail(verifyEmail);

    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
        throw HttpError(404, "Email not found");
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });

    res.json({
        message: "Verify success"
    })
}

const resendVerifyEmail = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }

    if(user.verify) {
        throw HttpError(400, "Email already verify")
    }

    const verifyEmail = createVerifyEmail({email, verificationCode: user.verificationCode});

    await sendEmail(verifyEmail);

    res.json({
        message: "Resend email success"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    })
}

const getCurrent = (req, res) => {
    const { name, email } = req.user;

    res.json({
        name,
        email,
    })
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        message: "Signout ssucess"
    })
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
}