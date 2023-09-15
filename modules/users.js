const mongoose = require("mongoose");
const { genPasswordHash } = require("../utils/auth/utiles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "Too short password"],
    },
    salt: String,
    passwordChangedAt: Date,
    passwordResetCode: String,
    pawsswordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ["user", "publisher", "admin"],
      default: "user",
    },
    isVarvaid: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    bookesToRead: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "book",
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const password = genPasswordHash(this.password);
  this.password = password.hashedPassword;
  this.salt = password.salt;

  next();
});

// const setImageURL = (doc) => {
//   if (doc.profileImg) {
//     const imageUrl = `${process.env.BASE_URL}/categories/${doc.profileImg}`;
//     doc.profileImg = imageUrl;
//   }
// };
// // findOne, findAll and update
// userSchema.post("init", (doc) => {
//   setImageURL(doc);
// });

// // create
// userSchema.post("save", (doc) => {
//   setImageURL(doc);
// });
const User = mongoose.model("user", userSchema);
module.exports = User;
