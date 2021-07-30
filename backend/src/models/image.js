const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imageSchema = new Schema({
   url: {
      type: String,
      required: true,
   },
   label: {
      type: String,
      required: true,
   },
});

imageSchema.set("toJSON", {
   transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
   }
});

const Image = model("Image", imageSchema);

module.exports = Image;