import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      require: [true, 'Password Is required'],
    },
    refreshToken: {
      type: String,
    },
    WatchHistory: {
      type: Schema.Types.ObjectId,
      ref: 'Videos',
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model('User', userSchema);
