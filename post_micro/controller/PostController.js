import Prisma from "../config/db.config.js";
class PostController {
  static async getPost(req, res) {
    try {
      const post = await Prisma.post.findMany({});
      return res.json({ post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  static async createPost(req, res) {
    try {
      const auth = req.user;
      const { title, content } = req.body;
      const post = await Prisma.post.create({
        data: {
          user_id: auth.id,
          title: title,
          content: content,
        },
      });
      return res.json({ message: "Post created successfully", post });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
export default PostController;