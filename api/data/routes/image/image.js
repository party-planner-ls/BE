const express = require("express");
const checkToken = require("../../../middleware.js");
const multer = require("multer");

const router = express.Router();

const Image = require("./image-model.js");

//This is used for uploading photos into user accounts
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/**
 * Method: POST
 * Endpoint: /api/users/uploadimage
 * Requires: Json WebToken in `req.header`
 * Returns: new length of images arr
 * Middleware: `checkToken` checks to see if client sends token in the header
 */
router.post(
  "/uploadimage",
  upload.single("imageData"),
  // checkToken,
  async (req, res) => {
    console.log(req.file, "i made it here req.file");
    const file = req.file;
    const newImage = {
      name: file.filename,
      data: file.path,
      image_list_id: 1
    };

    try {
      console.log(file.path, "i made it here");
      const addedImage = await Image.addImage(newImage);
      if (!file) {
        res.status(400).json({ message: "Please upload a file" });
      }
      res.status(201).json(addedImage);
    } catch (err) {
      res.status(500).json({ message: "Fail to upload image" });
    }
  }
);

router.get("/", checkToken, async (req, res) => {
  try {
    const images = await Image.getImages();
    res.status(200).json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the images" });
  }
});

module.exports = router;
