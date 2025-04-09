import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Employee name"],
      unique: true,
    },
    joiningDate: {
      type: String,
      required: [true, "Please provide Joining date"],
    },
    designation: {
      type: String,
      required: [true, "Please provide Designation of employee"],
    },
    department: {
      type: String,
      required: [true, "Please provide Department of employee"],
    },
    location: {
      type: String,
      required: [true, "Please provide Location of employee"],
    },
    workingLocation: {
      type: String,
      required: [true, "Please provide Working location"],
    },
    totalSalary: {
      type: String,
      required: [true, "Please provide Total number"],
    },
    employeeNo: {
      type: String,
      required: [true, "Please provide Employee number"],
    },
    totalWorkingDays: {
      type: String,
      default: "30",
    },
    client: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "Please specify Gender"],
    },
    modeofpayment: {
      type: String, // Bank Name
      required: [true, "Please provide Mode of Payment (Bank Name)"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
