const Student = require("./studentModel");

exports.createStudent = async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
};

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};
