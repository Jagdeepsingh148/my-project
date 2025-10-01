const express = require("express");
const router = express.Router();
const controller = require("./studentController");

router.post("/students", controller.createStudent);
router.get("/students", controller.getStudents);
router.put("/students/:id", controller.updateStudent);
router.delete("/students/:id", controller.deleteStudent);

module.exports = router;

