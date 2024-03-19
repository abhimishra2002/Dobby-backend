const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Images", imageSchema);
