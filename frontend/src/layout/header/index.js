import React from "react";
import headerLogo from "assets/logos/header-logo.svg";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <div className="w-full py-4 px-18">
      <div className="w-48 cursor-pointer" onClick={() => navigate("/")}>
        <img src={headerLogo} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Header;
