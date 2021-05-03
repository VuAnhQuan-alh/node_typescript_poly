import mongoose from "mongoose";
import crypto from "crypto";
import { v1 as uuid_v1 } from "uuid";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 32,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    // required: true,
  },
  about: {
    type: String,
    trim: true,
  },
  salt: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  }
}, { timestamps: true });

// virtual field
userSchema.virtual('password')
  .set(function(password) {
    this.salt = uuid_v1();
    this.hashed_password = this.encryptPassword(password);
  });

userSchema.methods = {
  authenticate: function(plaintext) {
    return this.encryptPassword(plaintext) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
    } catch (error) {
      return "";
    }
  }
}


module.exports = mongoose.model("User", userSchema);