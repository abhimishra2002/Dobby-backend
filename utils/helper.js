const cloudinary = require('../cloud')

exports.sendError = (res, error, statusCode = 401) => (
  res.status(statusCode).json({ error })
)

exports.notFoundHandler = (req,res)=>{
  return this.sendError(res,"Not found",404);
}

exports.uploadImageToCloud = async (file) => {
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file,
  );

  return { url, public_id };
};

exports.parseData = (req, res, next) => {
  const { image } = req.body;
  if (image) req.body.image = JSON.parse(image);
  next();
};