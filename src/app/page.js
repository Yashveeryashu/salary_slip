"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import YearBreaKDown from "@/components/YearBreaKDown";
import { ComponentToPrint } from "@/components/ComponentToPrint";
import { calculatePay } from "@/utils";
import {
  paymentInitialState,
  timeValueInitialState,
  userInitialState,
  months,
  nonMandatoryField,
} from "@/constants";

export default function Home() {
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [users, setUsers] = useState([]);
  const [nonMedFields, setNotMedFields] = useState(nonMandatoryField);
  const [payments, setPayments] = useState(paymentInitialState);
  const [selectedUser, setSelectedUser] = useState(userInitialState);
  const [timeVal, setTimeVal] = useState(timeValueInitialState);
  const [submittedUser, setSubmittedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [losOfPay, setLosOfPay] = useState("");
  const [incentive, setIncentive] = useState("");



  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "name") {
      setUsersList(
        users.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }




    if (selectedUser.hasOwnProperty(name)) {
      console.log("called");
      setSelectedUser({ ...selectedUser, [name]: value });
    }
    if (timeVal.hasOwnProperty(name)) {
      setTimeVal({ ...timeVal, [name]: value });
    }
    if (nonMedFields.hasOwnProperty(name)) {
      setNotMedFields({ ...nonMedFields, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = [];
    if (!selectedUser.totalSalary) error.push("Total Salary");
    if (!selectedUser.name) error.push("Name");
    if (!selectedUser.joiningDate) error.push("Joining Date");
    if (!selectedUser.designation) error.push("Designation");
    if (!selectedUser.department) error.push("Department");
    if (!selectedUser.location) error.push("Location");
    if (!selectedUser.employeeNo) error.push("Employee ID");
    if (!selectedUser.workingLocation) error.push("Working Location");
    if (!selectedUser.gender) error.push("gender");
    if (!selectedUser.modeofpayment) error.push("modeofpayment");
    if (!timeVal.workingDays) error.push("Effective Days");
    if (!timeVal.month) error.push("Month");
    if (!timeVal.totalWorkingDays) error.push("Working Days");
    if (!timeVal.year) error.push("Year");

    if (error.length) {
      toast.error(`Please Enter ${error.join(", ")}`);
      return;
    }

    const { base, inHRA, medic, allow, payableAmount } = calculatePay(
      selectedUser.totalSalary,
      timeVal.workingDays,
      timeVal.totalWorkingDays
    );
    setSubmittedUser({
      ...selectedUser,
      ...timeVal,
      basic: base.toFixed(2),
      HRA: inHRA.toFixed(2),
      medical: medic.toFixed(2),
      allowance: allow.toFixed(2),
      newPay: payableAmount.toFixed(2),
    });
    toast.success("Payslip generated");
  };

  const handelReset = (e) => {
    e.preventDefault();
    setShowYear(false);
    setNotMedFields(nonMandatoryField);
    setPayments(paymentInitialState);
    setTimeVal(timeValueInitialState);
    setSelectedUser(userInitialState);
    setSubmittedUser({});
    setIncentive("");
    setLosOfPay("");
  };

  const handleYearlyBreakDown = (e) => {
    e.preventDefault();

    const error = [];
    if (!selectedUser.totalSalary) error.push("Total Salary");
    if (!timeVal.totalWorkingDays) error.push("Working Days");
    if (!timeVal.workingDays) error.push("Effective Days");

    if (error.length) {
      toast.error(`Please Enter ${error.join(", ")}`);
      return;
    }

    const { base, inHRA, medic, allow, payableAmount } = calculatePay(
      selectedUser.totalSalary,
      timeVal.workingDays,
      timeVal.totalWorkingDays
    );
    setShowYear(true);
    setPayments({
      basic: base.toFixed(2),
      HRA: inHRA.toFixed(2),
      medical: medic.toFixed(2),
      allowance: allow.toFixed(2),
      newPay: payableAmount.toFixed(2),
    });
  };

  const handleOnBeforeGetContent = useCallback(() => {
    setLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setLoading(false);
      resolve();
    });
  }, [setLoading]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: selectedUser.name,
    onBeforeGetContent: handleOnBeforeGetContent,
    removeAfterPrint: true,
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = { ...submittedUser, ...nonMedFields };
      const { data } = await axios.post("/api/users/addUser", payload);
      toast.success(data.message);
      getAllUsers();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      setUsers([]);
      setUsersList([]);
      setLoading(true);
      const { statusText, status, data } = await axios.get(
        "/api/users/getAllUsers"
      );
      setUsers(data);
      setUsersList(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (user) => {
    setSelectedUser(user);
    setTimeVal({
      ...timeVal, 
      totalWorkingDays: user.totalWorkingDays,
    });

    for (const key in user) {
      if (nonMedFields.hasOwnProperty(key)) {
        setNotMedFields({ ...nonMedFields, [key]: user[key] });
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    <main>
      <section className="flex justify-center pt-5">
        <form
          className="p-6 glass min-w-[300px]"
          onSubmit={handleSubmit}
          onReset={handelReset}
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2">
            <div className="flex gap-2 items-center justify-between ">
              <label>Name: </label>
              <div
                className="relative border-red-600"
                onBlur={() =>
                  setTimeout(() => {
                    setInputFocused(false);
                  }, 500)
                }
              >
                <input
                  autoComplete="off"
                  className="w-60"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={selectedUser.name}
                  onChange={handleChange}
                  onClick={() => setInputFocused(true)}
                />
                {isInputFocused && (
                  <div className="absolute top-[100%] right-0 w-[100%] max-h-[250px] overflow-y-scroll flex gap-y-0.5 flex-col bg-white rounded-b">
                    {usersList.map((user) => (
                      <p
                        key={user._id}
                        className="text-black cursor-pointer pl-5 rounded hover:bg-blue-400 hover:text-white py-1"
                        onClick={() => handleClick(user)}
                      >
                        {user.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Joining Date: </label>
              <input
                autoComplete="off"
                className="w-60"
                type="text"
                name="joiningDate"
                placeholder="Enter Joining date"
                value={selectedUser.joiningDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Designation:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="text"
                name="designation"
                placeholder="Enter designation"
                value={selectedUser.designation}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Department:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="text"
                name="department"
                placeholder="Enter department"
                value={selectedUser.department}
                onChange={handleChange}
              />
            </div>


            <div className="flex gap-2 items-center justify-between">
              <label>Location:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="text"
                name="location"
                placeholder="Enter location"
                value={selectedUser.location}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Working Location:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="text"
                name="workingLocation"
                placeholder="Enter working location"
                value={selectedUser.workingLocation}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Employee Id:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="number"
                name="employeeNo"
                placeholder="Enter emloyee id"
                value={selectedUser.employeeNo}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Total Salary:</label>
              <input
                autoComplete="off"
                className="w-60"
                type="number"
                name="totalSalary"
                placeholder="Enter total salary"
                value={selectedUser.totalSalary}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Month name:</label>
              <select
                autoComplete="off"
                className="w-60"
                name="month"
                value={timeVal.month}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {months.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Year:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="year"
                type="number"
                placeholder="Enter Year"
                value={timeVal.year}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Total Working Days:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="totalWorkingDays"
                type="number"
                placeholder="Total Days"
                value={timeVal.totalWorkingDays}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Effective Days:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="workingDays"
                type="number"
                placeholder="Effective Days"
                value={timeVal.workingDays}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Client:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="client"
                type="text"
                placeholder="Enter client"
                value={nonMedFields.client}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>MOP :</label>
              <input
                autoComplete="off"
                className="w-60"
                name="modeofpayment"
                type="text"
                placeholder="Enter YOUR BANK NAME"
                value={nonMedFields.modeofpayment}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>GENDER:</label>
              <select
                 autoComplete="off"
                 className="w-60"
                  name="gender"
                  value={nonMedFields.gender}
                  onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>DOB:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="dob"
                type="text"
                placeholder="Enter DOB"
                value={nonMedFields.dob}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Incentive:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="incentive"
                type="number"
                placeholder="Enter incentive"
                value={incentive}
                onChange={(e) => setIncentive(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center justify-between">
              <label>Loss of Pay:</label>
              <input
                autoComplete="off"
                className="w-60"
                name="losOfPay"
                type="number"
                placeholder="Enter los of pay"
                value={losOfPay}
                onChange={(e) => setLosOfPay(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button
              className="text-red-200 font-semibold bg-transparent border-2 px-5 py-1 border-red-400 rounded-md hover:bg-red-600 hover:border-red-600 hover:text-white"
              type="reset"
            >
              Reset
            </button>
            <button
              className="text-green-200 font-semibold bg-transparent border-2 px-5 py-1 border-green-400 rounded-md hover:bg-green-600 hover:border-green-600 hover:text-white"
              type="button"
              onClick={handleYearlyBreakDown}
            >
              Breakdown
            </button>
            <button
              className="text-blue-200 font-semibold bg-transparent border-2 px-5 py-1  border-blue-400 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {showYear ? <YearBreaKDown payments={payments} /> : <></>}

      {Object.keys(submittedUser).length ? (
        <section className="flex flex-col my-5 justify-center items-center">
          <div className="w-[80vw]">
            <ComponentToPrint
              ref={componentRef}
              userInfo={submittedUser}
              incentive={incentive}
              losOfPay={losOfPay}
            />
          </div>


          <div className="flex gap-4 glass p-4">
            <button
              onClick={handleSave}
              className="text-red-200 font-semibold bg-transparent border-2 px-5 py-1 rounded-md hover:bg-red-600 border-red-400 hover:text-white hover:border-red-600 disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? "Loading..." : "Save"}
            </button>
            <button
              onClick={handlePrint}
              className="text-blue-200 font-semibold bg-transparent border-2 px-5 py-1 rounded-md hover:bg-blue-600 border-blue-400 hover:text-white hover:border-blue-600"
            >
              Print
            </button>
            


          </div>
        </section>
      ) : (
        <></>
      )}
    </main>
  );
}
