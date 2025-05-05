const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avaterUrl: { type: String },
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
});

// Default avatar 
userSchema.pre("save", function (next) {
    if (!this.avaterUrl) {
        if (this.gender === "male") {
            this.avaterUrl = "https://www.clipartmax.com/png/middle/258-2582267_circled-user-male-skin-type-1-2-icon-male-user-icon.png";
        } else if (this.gender === "female") {
            this.avaterUrl = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png";
        }
    }
    next();
});

module.exports = mongoose.model("User", userSchema);

