import { articleSchema } from '../schemas/article.schema.js';

export const articlesController = {
  get(req, res, next) {
    articleSchema.find({})
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "Get data successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: "Get data failed",
        }));
  },

  getOne(req, res, next) {
    const id = req.params.id;
    articleSchema.find({ _id: id })
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "Get data successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: "Get data failed",
        }));
  },

  upload: async (req, res) => {
    const { body } = req
    try {
      const formData = {
        ...body,
        authorId: req?.params.id,
      }
      const newArticle = await articleSchema.create(formData);
      newArticle.save();
      res.status(201).json({
        statusCode: 200,
        message: "Upload data successfully",
        data: newArticle,
        success: true,
      })
    } catch (error) {
      res.status(409).json({
        message: "Image entity too large",
      });
    }
  },

  delete(req, res) {
    articleSchema.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "Delete data successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: `Can't find id: ${req.params.id}.`,
        }));
  },

  update: async (req, res) => {
    const { body } = req

    await articleSchema.updateOne({ _id: req.params.id }, body)
      .then((data) => {
        res.status(200).json({
          statusCode: 200,
          message: "Update data successfully",
          data: data,
          success: true,
        })
      })
      .catch(() =>
        res.status(404).json({
          success: false,
          message: `Can't find id: ${req.params.id}.`,
        }));
  },

};