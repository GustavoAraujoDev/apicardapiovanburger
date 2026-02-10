const UserRepository = require("../../domain/entities/UserRepository");
const User = require("../../domain/entities/user");

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

  return new User({
    id: doc._id.toString(),
    email: doc.email,
    passwordHash: doc.passwordHash,
    role: doc.role,
    status: doc.status ?? 'active',
    loginAttempts: doc.loginAttempts ?? 0,
    lastLoginAt: doc.lastLoginAt ?? null,
    blockedAt: doc.blockedAt ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  });
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
