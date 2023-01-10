import { userSchema } from "../schemas/user.schema.js"

export const userController = {
  getUser: async (req, res) => {
    try {
      const user = await userSchema.findOne({ _id: req.params._id })

      if (!user) {
        return res.status(404).json({ message: `User with id "${id}" not found.` });
      }

      return res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json(error);
    }
  },
}