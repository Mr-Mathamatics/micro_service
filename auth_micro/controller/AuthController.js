import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";

class AuthController {
  static async register(req, res) {
    try {
      const payload = req.body;
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const user = await prisma.authUser.create({
        data: payload,
      });
      return res.json({ message: "Account created successfully!", user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.authUser.findUnique({
        where: { email: email },
      });
      if (user) {
        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401).json({ message: "Invalid password" });
        } else {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d",
          });
          return res.json({
            message: "Logged in successfully",
            token: `Bearer ${token}`,
          });
        }
      }

      res.status(401).json({ message: "Invalid email or password" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async user(req, res) {
    const user = req.user;
    return res.json({ user });
  }
}

export default AuthController;
