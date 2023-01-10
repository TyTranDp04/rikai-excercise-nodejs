import jwt from "jsonwebtoken";
import { userSchema } from "../schemas/user.schema.js";

export const authController = {
  //Function
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign({
      id: user.id,
    },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  //Sign up
  signup: async (req, res) => {
    try {
      const { Name, Gmail, Password } = req.body;
      const checkDuplicationUser = await userSchema.findOne({ Gmail });
      if (!Name || !Gmail || !Password) {
        return res.status(422).json({ message: 'The fields gmail, name and password are required' });
      }
      if (checkDuplicationUser) {
        return res.status(422).json({ message: 'This email already exists' });
      }
      //Create new user
      const newUser = await new userSchema({
        Name,
        Gmail,
        Password,
        Role: 'user',
      });
      //Save user to DB
      await newUser.save();
      res.status(200).json({ message: 'Sign up successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Sign in
  signin: async (req, res) => {
    const passwordInput = req.body.Password;
    try {
      const user = await userSchema.findOne({ Gmail: req.body.Gmail });
      const validPassword = user?.Password;

      if (!user || passwordInput !== validPassword) {
        return res.status(400).json({
          statusCode: "400",
          message: "Username or Password is incorrect",
          data: null,
          success: false,
        });
      } else {
        const accessToken = authController.generateAccessToken(user);
        return res.status(200).json({
          statusCode: "200",
          message: "Login Success",
          data: {
            accessToken: accessToken,
            user: {
              id: user.id,
              Gmail: user.Gmail,
              Name: user.Name,
            },
          },
          success: true,
        });
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  },

};




