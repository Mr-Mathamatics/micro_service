import prisma from "../config/db.config.js";

class UserController {
  static async getUser(req, res) {
    const id = req.params.id;
    const user = await prisma.authUser.findUnique({
      where: { id: id },
    });
    res.json({ user });
  }
}
export default UserController;
