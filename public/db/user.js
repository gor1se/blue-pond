import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    joinDate: String,
    visions: Array,
    entries: Array,
});

export default mongoose.model("User", userSchema);
