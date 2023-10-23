import styles from "../styles/Home.module.css";
import React from "react";
import { FontAwesomeIcon } from "../node_modules/@fortawesome/react-fontawesome/index";
import { faUser } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import { faInstagram } from "../node_modules/@fortawesome/free-brands-svg-icons/index";
import { faFacebook } from "../node_modules/@fortawesome/free-brands-svg-icons/index";
import { faCheck } from "../node_modules/@fortawesome/free-solid-svg-icons/index";
import Link from "../node_modules/next/link";
import { useEffect, useState } from "react";

function Footer() {
  const openInsta = () => {
    window.open("https://www.instagram.com", "_blank");
  };

  const openFb = () => {
    window.open("https://www.facebook.com", "_blank");
  };

  return (
    <div
      className="w-full h-full pt-5 pl-5 flex flex-row justify-between"
      style={{ backgroundColor: "#33B49C" }}
    >
      <div className="flex ">
        <div className="flex flex-row">
          <Link href="/">
            <img src="/questlogowhite.png" className="h-8 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col text-white text-sm pb-5 pl-5">
          <p className="w-3/12 hover:text-neutral-200">
            <Link href="">FAQ</Link>
          </p>
          <p className="hover:text-neutral-200">
            <Link href="">Contactez-nous</Link>
          </p>
          <p className="hover:text-neutral-200">
            <Link href="">Mentions légales</Link>
          </p>
          <p className="w-4/12 hover:text-neutral-200">
            <Link href="">RGPD</Link>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-around pb-5">
        <div className="mr-10 text-white text-lg hover:text-neutral-200">
          <Link href="/conciergewelcome">Devenir concierge</Link>
        </div>
        <div className="flex flex-row justify-end mr-10">
          <FontAwesomeIcon
            icon={faInstagram}
            className="h-6 text-white hover:text-neutral-200 cursor-pointer"
            onClick={openInsta}
          />
          <FontAwesomeIcon
            icon={faFacebook}
            className="h-6 text-white ml-5 hover:text-neutral-200 cursor-pointer"
            onClick={openFb}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
