import mongoose from "mongoose";
import { softDeletePlugin } from "soft-delete-plugin-mongoose";

mongoose.Promise = global.Promise;

const dbArticleSchema = new mongoose.Schema({
  authorId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  images: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  }
}, { timestamps: true });

dbArticleSchema.plugin(softDeletePlugin);
export const articleSchema = mongoose.model('articles', dbArticleSchema);