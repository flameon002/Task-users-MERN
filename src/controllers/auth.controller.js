import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { token } from "morgan";
import { createAccesToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // BUSCA SI EL USUARIO YA EXISTE
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email already exist"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved._id });

    res.cookie("token", token);
    // res.json({
    //   message: "User created succesfully",
    // });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // busca el usuario y verificar que exista
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // comprueba que conincidan las contraseñas
    const passwordIsMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordIsMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.sendStatus(200);
};

const profile = async (req, res) => {
  // console.log(req.user);
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};



// export const verifyToken = async (req, res) => {
//   const { token } = req.cookies;
//   if (!token) return res.status(401).json({ message: " Unauthorized" });

//   jwt.verify(token, TOKEN_SECRET, async (err, user) => {
//     if (err) return res.status(401).json({ message: "Unauthorized" });

//     const userFound = await User.findById(user.id);
//     if (!userFound) return res.status(401).json({ message: " Unauthorized" });

//     return res.json({
//       id: userFound - _id,
//       username: userFound.username,
//       email: userFound.email,
//     });
//   });
// };

export { register, login, logout, profile,verifyToken };
