import Image from "next/image";
import React from "react";
import logo from "../assets/logo-icon.png";

const Navbar = () => {
  return (
    <div>
      <div>
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="bg-green-700 "
        />
      </div>
    </div>
  );
};

export default Navbar;
