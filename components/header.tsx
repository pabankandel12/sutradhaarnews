"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";

const nav = ["गृहपृष्ठ", "समाचार", "राजनीति", "अर्थ", "समाज", "प्रदेश", "खेलकुद", "मनोरञ्जन", "प्रविधि", "विश्व", "विचार"];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="utility"><div className="container utility-inner"><span>बिहीबार, २८ साउन २०८३</span><span>काठमाडौं · २७°C</span></div></div>
      <header className="site-header">
        <div className="container header-main">
          <button className="icon-button mobile-only" onClick={() => setOpen(!open)} aria-label="मेनु खोल्नुहोस्"><FontAwesomeIcon icon={open ? faXmark : faBars} /></button>
          <Logo />
          <div className="header-actions">
            <button className="icon-button" aria-label="खोज्नुहोस्"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <button className="login-button"><FontAwesomeIcon icon={faUser} /> लगइन</button>
          </div>
        </div>
        <nav className={open ? "nav open" : "nav"}><div className="container nav-inner">{nav.map((item, index) => <a className={index === 0 ? "active" : ""} href="#" key={item}>{item}</a>)}</div></nav>
      </header>
    </>
  );
}
