"use client";

import Image from "next/image";
import EditImage from "@/assets/editIcon.svg";
import { useState } from "react";
import EditUserModal from "@/modals/EditUserModal";

const EditButton = ({ emp }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button
        className="bg-transparent border px-2 py-1 rounded-md hover:bg-red-600 hover:border-red-600"
        onClick={openModal}
      >
        <Image src={EditImage} width={20} height="auto" alt="delete" />
      </button>
      <EditUserModal emp={emp} closeModal={closeModal} showModal={showModal} />
    </>
  );
};

export default EditButton;
