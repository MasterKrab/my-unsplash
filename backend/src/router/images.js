const express = require("express");
const router = express.Router();
const Image = require("../models/image");

router.get("/", (req, res) => {
   Image.find()
      .then(result => res.json(result))
      .catch(error => console.log(error));
});

router.get("/:label", (req, res) => {
   const { label } = req.params;

   Image.find({ label })
      .then(result => res.json(result))
      .catch(error => console.log(error));
});

router.post("/", (req, res) => {
   const body = req.body

   Image.create({ ...body, date: new Date() })
      .then(() => {
         res.status(201).json({
            state: true,
            code: 201,
            message: "Created",
         });
      })
      .catch(error => {
         console.log(error);
         res.json({
            state: false,
            code: 400,
            message: error._message === "Image validation failed" ? "Validation failed" : "An error has ocurred",
         });
      });
});

router.delete("/:id", (req, res) => {
   const _id = req.params.id;

   Image.findByIdAndDelete({ _id })
      .then(result => {
         if (result) {
            res.status(200).json({
               state: true,
               message: "Deleted",
            });
         } else {
            res.status(400).json({
               state: false,
               message: "Fail delete",
            });
         }
      })
      .catch(error => console.error(error));
});

module.exports = router;