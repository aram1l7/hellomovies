import React from "react";
import headerLogo from "assets/logos/header-logo.svg";
function Header() {
  return (
    <div className="w-full py-4 px-18">
      <div className="w-48">
        <img src={headerLogo} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Header;
