import User from "@/models/user.model";
import { connect } from "@/dbConfig/dbConfig";
import { unstable_noStore as noStore } from "next/cache";

export const getEmployees = async () => {
  noStore();
  connect();
  const users = await User.find();
  users.sort((a, b) => a.employeeNo - b.employeeNo);
  return users;
};
