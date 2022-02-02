import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    joinDate: String,
});

export default mongoose.model("User", userSchema);
