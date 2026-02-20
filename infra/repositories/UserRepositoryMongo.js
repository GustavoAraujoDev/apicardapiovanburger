const UserRepository = require("../../domain/entities/UserRepository");
const User = require("../../domain/entities/user");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
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

    status: {
      type: String,
      enum: ['active', 'blocked', 'inactive'],
      default: 'active'
}
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", UserSchema);




class UserRepositoryMongo extends UserRepository {
  async save(user) {
    await UserModel.create({
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      status: user.status,
      loginAttempts: user.loginAttempts,
      lastLoginAt: user.lastLoginAt,
      blockedAt: user.blockedAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async findByEmail(email) {
  const doc = await UserModel.findOne({ email }).lean();
  if (!doc) return null;

  return new User({
    id: doc.id.toString(),
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

  async update(user) {
  await UserModel.updateOne(
    { id: user.id },
    {
      $set: {
        status: user.status,
        lastLoginAt: user.lastLoginAt,
        blockedAt: user.blockedAt,
        updatedAt: user.updatedAt
      },
      $setOnInsert: undefined,
      $set: {
        loginAttempts: user.loginAttempts
      }
    }
  );
}

  async findById(id) {
    const userId = typeof id === "string" ? id : id.id; // garante string se receber objeto

  const doc = await UserModel.findOne({ id: userId }).lean(); // ⚡ aqui é findOne({ id })
    if (!doc) return null;

    return new User(
      doc.id.toString(),
      doc.email,
      doc.passwordHash,
      doc.role,
      doc.status
    );
  }
}

module.exports = { UserRepositoryMongo, UserModel };
