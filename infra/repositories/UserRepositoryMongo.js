const UserRepository = require("../../domain/entities/UserRepository");
const User = require("../../domain/entities/User");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      default: "EMPLOYEE"
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", UserSchema);




class UserRepositoryMongo extends UserRepository {
  async save(userData) {
    return await UserModel.create(userData);
  }

  async findByEmail(email) {
    const doc = await UserModel.findOne({ email }).lean();

    if (!doc) return null;

    return new User(
      doc._id.toString(),
      doc.email,
      doc.passwordHash,
      doc.role,
      doc.active
    );
  }

  async findById(id) {
    const doc = await UserModel.findById(id).lean();

    if (!doc) return null;

    return new User(
      doc._id.toString(),
      doc.email,
      doc.passwordHash,
      doc.role,
      doc.active
    );
  }
}

module.exports = { UserRepositoryMongo, UserModel };
