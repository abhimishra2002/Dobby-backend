const cloudinary = require("../cloud");
const { isValidObjectId } = require("mongoose");
const Image = require("../models/images.js");
const User = require("../models/user");
const { sendError } = require("../utils/helper");

exports.createImage = async (req, res) => {
  const { file } = req;
  const { name: imageName } = req.body;
  const userId = req.user._id;
  console.log(file,imageName);
  if (!isValidObjectId(userId)) {
    // return sendError(res, "Invalid User!");
    console.log("Invalid user");
    //Invalid user error
    return sendError(res, "Invalid user", 401);
  }

  if (!file) {
    //Error image missing
    console.log("Image missing");
    return sendError(res, "Image missing", 401);
  }
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path
  );
  const user = await User.findOne({ _id: userId });

  const newImage = new Image({
    author: userId,
    name: imageName,
    url,
    public_id,
  });
  user.images.push(newImage._id);
  await user.save();
  await newImage.save();
  console.log(newImage);
  res.status(200).json({
    id: newImage._id,
    name: imageName,
    url,
    public_id,
  });
};

exports.getImage = async (req, res) => {
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    console.log("Error invalid userid");
    //Invalid user error
    return sendError(res, "Error invalid userid", 401);
  }
  const user = await User.findOne({ _id: userId }).populate({
    path: "images",
  });

  const images = user.images.map((image) => {
    const { url, name: imageName, public_id, _id: imageId } = image;
    return {
      id: imageId,
      name: imageName,
      url,
      public_id,
    };
  });
  res.status(200).json({
    images,
  });
};

exports.getImageBySearch = async (req, res) => {
  const { title } = req.query;
  console.log(title);
  if (!title) {
    return sendError(res, "Invalid request", 401);
  }
  if (!title.trim()) {
    // return sendError(res, "Invalid request!")
    console.log("Invalid request");
    return sendError(res, "Invalid request", 401);
  }

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    console.log("Error invalid userid");
    //Invalid user error
    return sendError(res, "Error invalid userid", 401);
  }
  const user = await User.findById(userId).populate({
    path: "images",
  });

  let images = user.images;

  // Check if search query is present
  if (req.query.search) {
    const searchQuery = title.toLowerCase();

    images = images.filter((image) =>
      image.name.toLowerCase().includes(searchQuery)
    );
  }

  // Map filtered images
  images = images.map((image) => {
    const { url, name: imageName, public_id, _id: imageId } = image;
    return {
      id: imageId,
      name: imageName,
      url,
      public_id,
    };
  });
  res.status(200).json({
    images,
  });
};

exports.getImageById = async (req, res) => {
  const { imageId } = req.params;
  if (!isValidObjectId(imageId)) {
    // return sendError(res, " id is not valid!");
    console.log("Not found error");
    return sendError(res, "Not found error", 401);
  }
  const image = await Image.findById(imageId);
  const { name, url, public_id } = image;
  res.status(200).json({
    image: {
      name,
      url,
      public_id,
    },
  });
};
