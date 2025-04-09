"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paths } from "@/constants";
import { useState } from "react";
import AddUserModal from "@/modals/AddUserModal";
import AddUserIcon from "./ui/AddUserIcon";

const Navbar = () => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <nav className="relative">
        <div className="text-white flex gap-5 justify-center text-2xl glass py-3">
          {Paths.map((path) => (
            <Link
              key={path.endpoint}
              className={`hover:bg-[#00000060] rounded-lg px-4 py-1 ${
                pathname === path.endpoint ? "glass" : ""
              }`}
              href={path.endpoint}
            >
              {path.pathName}
            </Link>
          ))}
        </div>
        <div className="absolute h-full right-10 top-0 flex justify-center items-center">
          <button
            title="Add Employee"
            className="h-8 w-20 rounded bg-green-500 text-white flex gap-2 items-center justify-center"
            onClick={openModal}
          >
            Add <AddUserIcon />
          </button>
        </div>
      </nav>
      <AddUserModal showModal={showModal} closeModal={closeModal} />
    </>
  );
};
export default Navbar;
