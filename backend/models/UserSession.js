import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  languagePreference: {
    type: String,
    enum: ["english", "twi"],
    default: "english",
  },
  lastMenuPosition: { type: String, default: "main" },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // Session expires after 1 hour
});

const UserSession = mongoose.model("UserSession", userSessionSchema);

export default UserSession;
