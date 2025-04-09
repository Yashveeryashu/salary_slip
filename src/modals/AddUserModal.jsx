import {
  customModalStyles,
  nonMandatoryField,
  userInitialState,
} from "@/constants";
import { useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";

const AddUserModal = ({ showModal, closeModal }) => {
  const [nonMedFields, setNotMedFields] = useState(nonMandatoryField);
  const [selectedUser, setSelectedUser] = useState(userInitialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (selectedUser.hasOwnProperty(name)) {
      setSelectedUser({ ...selectedUser, [name]: value });
    }
    if (nonMedFields.hasOwnProperty(name)) {
      setNotMedFields({ ...nonMedFields, [name]: value });
    }
  };

  const handelReset = (e) => {
    e.preventDefault();
    setNotMedFields(nonMandatoryField);
    setSelectedUser(userInitialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...selectedUser, ...nonMedFields };
      const { data } = await axios.post("/api/users/addUser", payload);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    handelReset(e);
    closeModal();
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      style={customModalStyles}
      contentLabel="Delete Modal"
    >
      {loading ? (
        <p className="text-center text-xl">Adding...</p>
      ) : (
        <div className="p-2 relative">
          <button
            onClick={handleClose}
            onSubmit={handleSubmit}
            className="text-white absolute top-0 right-0"
          >
            X
          </button>
          <p className="text-center text-2xl">Add Employee</p>
          <form className="grid grid-cols-2 gap-4 mt-6" onReset={handelReset}>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="name">Name:</label>
              <input
                className="col-span-2"
                type="text"
                name="name"
                value={selectedUser.name}
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="joiningDate">Joining:</label>
              <input
                className="col-span-2"
                type="text"
                name="joiningDate"
                value={selectedUser.joiningDate}
                placeholder="Enter Joining Date"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="designation">Designation:</label>
              <input
                className="col-span-2"
                type="text"
                name="designation"
                value={selectedUser.designation}
                placeholder="Enter designation"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="department">Department:</label>
              <input
                className="col-span-2"
                type="text"
                name="department"
                value={selectedUser.department}
                placeholder="Enter department"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="location">Location:</label>
              <input
                className="col-span-2"
                type="text"
                name="location"
                value={selectedUser.location}
                placeholder="Enter location"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="workingLocation">Working:</label>
              <input
                className="col-span-2"
                type="text"
                name="workingLocation"
                value={selectedUser.workingLocation}
                placeholder="Enter Working Location"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="totalSalary">Total Salary:</label>
              <input
                className="col-span-2"
                type="number"
                name="totalSalary"
                value={selectedUser.totalSalary}
                placeholder="Enter total salary"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="employeeNo">Emp. Id:</label>
              <input
                className="col-span-2"
                type="number"
                name="employeeNo"
                value={selectedUser.employeeNo}
                placeholder="Enter employee no"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="client">Client:</label>
              <input
                className="col-span-2"
                type="text"
                name="client"
                value={nonMedFields.client}
                placeholder="Enter client"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="dob">DOB:</label>
              <input
                className="col-span-2"
                type="text"
                name="dob"
                value={nonMedFields.dob}
                placeholder="Enter Dob"
                onChange={handleChange}
              />
            </div>
            
            <div />
            <div className="col-span-2 flex justify-center items-center mt-4 gap-4">
              <button
                className="text-red-200 font-semibold bg-transparent border-2 px-5 py-1 border-red-400 rounded-md hover:bg-red-600 hover:border-red-600 hover:text-white"
                type="reset"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="text-blue-200 font-semibold bg-transparent border-2 px-5 py-1  border-blue-400 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};
export default AddUserModal;
