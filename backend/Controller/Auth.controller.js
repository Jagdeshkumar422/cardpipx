import { errorHandler } from "../utils/Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";

//!--------------------------------------------------------------------

export const register = async (req, res, next) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }
  // Validate fields
  if (name && name.trim() === "") {
    return next(errorHandler(400, "Name is required."));
  }
  if (email && email.trim() === "") {
    return next(errorHandler(400, "Email is required."));
  }

  if (password && password.length < 8) {
    return next(
      errorHandler(400, "Password must be at least 8 characters long.")
    );
  }
  if (username) {
    if (username.length < 6 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 6 and 20 characters.")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces."));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase."));
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers.")
      );
    }
  }
  try {
    const existingEmail = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingEmail) {
      return next(errorHandler(400, "User already exist with this Email."));
    }
    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return next(errorHandler(400, "User already exist with this Username."));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    //generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    const { password: pass, ...rest } = newUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
      })
      .json({ message: "User registered Successfully.", data: rest });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal Server Error."));
  }
};

//!--------------------------------------------------------------------

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "") {
    return next(errorHandler(400, "Email is required."));
  }
  if (!password || password.trim() === "") {
    return next(errorHandler(400, "Password is required."));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found."));
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password."));
    }

    //generate JWT token
    const token = jwt.sign(
      { id: validUser._id, email: validUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    const { password: pass, ...rest } = validUser._doc;

    //send access token
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict",
      })
      .json({ message: "User Signin Successfully.", data: rest });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Internal Server Error."));
  }
};

//!--------------------------------------------------------------------

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "User has been signout." });
  } catch (error) {}
};

//!--------------------------------------------------------------------

export const updatePersonalInfo = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (name) {
    if (name.trim() === "") {
      return next(errorHandler(400, "Name is required."));
    }
  }
  if (email) {
    if (email.trim() === "") {
      return next(errorHandler(400, "Email is required."));
    }
  }
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(errorHandler(404, "Email already exit."));
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "User not found."));
    }
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json({ message: "Profile updated successfully.", data: rest });
  } catch (error) {
    next(error);
  }
};

//!--------------------------------------------------------------------

export const updatePassword = async (req, res, next) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  // if (req.user.id !== req.params.id) {
  //   return next(errorHandler(403, "You are not allowed to update this user"));
  // }
  // validate currentPassword

  if (currentPassword) {
    if (currentPassword.trim() === "") {
      return next(errorHandler(400, "Current Password is required."));
    } else {
      const user = await User.findById(id);
      if (!user) {
        return next(errorHandler(404, "User not found."));
      }
      const isMatch = await bcryptjs.compare(currentPassword, user.password);
      if (!isMatch) {
        return next(errorHandler(404, "Current Password is incorrect."));
      }
    }
  }

  if (newPassword) {
    if (newPassword.trim() === "") {
      return next(errorHandler(400, "New password is required."));
    } else if (newPassword.length < 8) {
      return next(
        errorHandler(400, "New password must be atleast 8 characters long.")
      );
    }
  }

  // Hash the new password if provided
  let hashedPassword;
  if (newPassword) {
    hashedPassword = await bcryptjs.hash(newPassword, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "User not found."));
    }
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json({ message: "Profile updated successfully.", data: rest });
  } catch (error) {
    next(error);
  }
};

//!--------------------------------------------------------------------

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//!--------------------------------------------------------------------

export const deleteUser = async (req, res, next) => {
  const { id, userPassword } = req.params;

  // if (!req.user.isAdmin && req.user.id !== req.params.id) {
  //   return next(errorHandler(403, "You are not allowed to delete this user"));
  // }

  if (!userPassword) {
    return next(errorHandler(400, "Password is required."));
  }
  try {
    const user = await User.findById(id);
    const comparePassword = await bcryptjs.compare(userPassword, user.password);
    if (!comparePassword) {
      return next(errorHandler(400, "Please enter correct password."));
    }
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return next(errorHandler(404, "User not found."));
    }
    res.status(200).json("User has been deleted.");
  } catch (error) {}
};

//!--------------------------------------------------------------------

export const getUserBalance = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//!--------------------------------------------------------------------

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (!users) {
      return next(errorHandler(404, "No any found."));
    }
    const filteredUsers = users.map((user) => {
      const userObj = user.toObject(); // Convert to plain object
      delete userObj.password; // Remove password field
      return userObj; // Return the modified object
    });
    res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
};

//!--------------------------------------------------------------------

export const deleteByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return next(errorHandler(404, "User not found."));
    }
    res.status(200).json({ message: "User deleted Successfully." });
  } catch (error) {
    next(error);
  }
};
