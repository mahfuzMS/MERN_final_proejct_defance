const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, token) => {
    const url = `http://localhost:5000/api/auth/verify/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
    });
};

const sendResetEmail = async (email, token) => {
    const url = `http://localhost:5000/api/auth/reset/${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Your Password",
        html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
    });
};

module.exports = { sendVerificationEmail, sendResetEmail };
