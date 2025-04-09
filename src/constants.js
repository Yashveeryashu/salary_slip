export const userInitialState = {
  name: "",
  joiningDate: "",
  designation: "",
  department: "",
  location: "",
  workingLocation: "",
  employeeNo: "",
  totalSalary: "",
  gender: "",  
  modeofpayment: "", 
};

export const paymentInitialState = {
  basic: "",
  HRA: "",
  medical: "",
  allowance: "",
  newPay: "",
};

export const timeValueInitialState = {
  workingDays: "",
  totalWorkingDays: "30",
  month: "",
  year: "",
};

export const nonMandatoryField = {
  client: "",
  dob: "",

};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const scales = ["", "Thousand", "Lakh", "Crore"];

export const oneToNineteen = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

export const twoDigit = [
  "",
  "Ten",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

export const oneDigit = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

export const Paths = [
  {
    endpoint: "/",
    pathName: "Home",
  },
  {
    endpoint: "/list",
    pathName: "Employees",
  },
];

export const customModalStyles = {
  content: {
    top: "50%",
    right: "50%",
    left: "auto",
    bottom: "auto",
    transform: "translate(50%, -50%)",
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },
};
