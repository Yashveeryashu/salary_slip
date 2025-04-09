export const fetchCache = "force-no-store";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    if (reqBody._id) {
      const {
        _id,
        name,
        joiningDate,
        designation,
        department,
        location,
        workingLocation,
        totalSalary,
        employeeNo,
        totalWorkingDays,
        client,
        dob,
        gender, 
        modeofpayment, 
      } = reqBody;

      const user = await User.findOne({ _id });

      if (name && user.name !== name) user.name = name;
      if (joiningDate && user.joiningDate !== joiningDate)
        user.joiningDate = joiningDate;
      if (designation && user.designation !== designation)
        user.designation = designation;
      if (department && user.department !== department)
        user.department = department;
      if (location && user.location !== location) user.location = location;
      if (workingLocation && user.workingLocation !== workingLocation)
        user.workingLocation = workingLocation;
      if (totalSalary && user.totalSalary !== totalSalary)
        user.totalSalary = totalSalary;
      if (employeeNo && user.employeeNo !== employeeNo)
        user.employeeNo = employeeNo;
      if (totalWorkingDays && user.totalWorkingDays !== totalWorkingDays)
        user.totalWorkingDays = totalWorkingDays;
      if (client && user.client !== client) user.client = client;
      if (dob && user.dob !== dob) user.dob = dob;
      if (gender && user.gender !== gender) user.gender = gender;  
      if (modeofpayment && user.modeofpayment !== modeofpayment)
        user.modeofpayment = modeofpayment;  

      await user.save();

      return NextResponse.json(
        { message: "User Updated", success: true },
        { status: 201 }
      );
    } else {
      const newUser = new User(reqBody);
      await newUser.save();

      return NextResponse.json(
        { message: "New User Created", success: true },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
