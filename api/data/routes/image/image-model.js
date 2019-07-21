const db = require("../../../db/dbConfig.js");

const getImages = () => {
  return db("image");
};

const addImage = image => {
  return db("image")
    .insert(image)
    .then(ids => {
      return getImageById(ids[0]);
    });
};

const getImageById = id => {
  return db("image")
    .where("id", id) //* returns image within array
    .first();
};

const updateImage = (id, image) => {
  return db("image")
    .update(image)
    .where("id", id) //* returns count of updated
    .then(image => {
      return getImageById(id);
    });
};

const deleteImage = id => {
  return db("image")
    .where("id", id)
    .del();
  //* returns count of deleted
};

module.exports = {
  getImages,
  getImageById,
  addImage,
  updateImage,
  deleteImage
};
