import mongoose from "mongoose"
import { softDeletePlugin } from "soft-delete-plugin-mongoose"

mongoose.Promise = global.Promise;

const dbUserSchema = new mongoose.Schema({
  Role: {
    type: String,
  },
  Name: {
    type: String,
    require: true,
  },
  Gmail: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  }
}, { timestamps: true });

dbUserSchema.plugin(softDeletePlugin);
export const userSchema = mongoose.model('users', dbUserSchema);