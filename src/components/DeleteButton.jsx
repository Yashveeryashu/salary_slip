"use client";

import Image from "next/image";
import BinImage from "@/assets/delete.png";
import { useState } from "react";
import DeleteModal from "@/modals/DeleteModal";

const DeleteButton = ({ emp }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <button
        className="bg-transparent border px-2 py-1 rounded-md hover:bg-red-600 hover:border-red-600"
        onClick={openModal}
      >
        <Image src={BinImage} width={20} height="auto" alt="delete" />
      </button>
      <DeleteModal emp={emp} closeModal={closeModal} showModal={showModal} />
    </>
  );
};

export default DeleteButton;
