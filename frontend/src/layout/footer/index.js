import React from "react";
import footerLogo from "assets/logos/footer-logo.svg";
import { ReactComponent as Facebook } from "assets/social/facebook.svg";
import { ReactComponent as Linkedin } from "assets/social/linkedIn.svg";
import { ReactComponent as Dribble } from "assets/social/dribbble.svg";
import { ReactComponent as Instagram } from "assets/social/instagram.svg";

function Footer() {
  return (
    <div className="w-full bg-dark gap-4 py-5 px-18 flex flex-col md:flex-row justify-between items-center">
      <div className="flex gap-4 lg:gap-2 flex-col md:flex-row items-center">
        <div className="w-36">
          <img src={footerLogo} className="w-full h-full object-cover" />
        </div>
        <span className="hidden md:block text-sky-200">{" | "}</span>
        <p
          data-testid="copyright"
          className="text-sm text-center text-slate-200 font-light"
        >
          &copy; Copyright {new Date().getFullYear()} HelloMovies. All Rights
          Reserved
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <Facebook className="w-8 h-6 fill-white" />
        <Linkedin className="w-8 h-6 fill-white" />
        <Dribble className="w-8 h-6 fill-white" />
        <Instagram className="w-8 h-6 fill-white" />
      </div>
    </div>
  );
}

export default Footer;
