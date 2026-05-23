const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    maritalStatus: String,
    nationality: String,

    phone: String,
    email: String,
    tempAddress: String,
    permAddress: String,

    employeeId: String,
    jobTitle: String,
    department: String,
    supervisor: String,
    salary: Number,
    employmentType: String,
    dateOfJoining: Date,
    contractStart: Date,
    contractEnd: Date,

    emergencyName: String,
    emergencyRelation: String,
    emergencyPhone: String,

    profilePicture: String,
    idDocuments: String,

    password: String ,
    role: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
