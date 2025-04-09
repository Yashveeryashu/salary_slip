import { customModalStyles } from "@/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

const DeleteModal = ({ emp, closeModal, showModal }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const handelDelete = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/deleteUser", { id: emp._id });
      closeModal();
      toast.success("Deletion successful");
      router.refresh()
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={showModal}
      style={customModalStyles}
      contentLabel="Delete Modal"
    >
      {loading ? (
        <p className="text-center text-xl">Deleting...</p>
      ) : (
        <div className="p-2">
          <div className="mb-2">
            <p className="text-center text-xl">Confirm to Delete ? </p>
            <p className="text-center text-xl text-red-500"> {emp.name} </p>
          </div>

          <div className="flex justify-center gap-4 px-2 mt-4">
            <button
              onClick={closeModal}
              className="text-red-200 font-semibold bg-transparent border-2 px-5 py-1 border-red-400 rounded-md hover:bg-red-600 hover:border-red-600 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handelDelete}
              className="text-blue-200 font-semibold bg-transparent border-2 px-5 py-1  border-blue-400 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default DeleteModal;
