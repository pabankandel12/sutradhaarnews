"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";

const nav = [
  ["गृहपृष्ठ", "/"], ["समाचार", "/category/samachar"], ["राजनीति", "/category/rajniti"],
  ["अर्थ", "/category/artha"], ["समाज", "/category/samaj"], ["प्रदेश", "/category/pradesh"],
  ["खेलकुद", "/category/khelkud"], ["मनोरञ्जन", "/category/manoranjan"], ["प्रविधि", "/category/prabidhi"],
  ["विश्व", "/category/bishwo"], ["विचार", "/category/bichar"],
];

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
            <Link className="icon-button link-button" href="/search" aria-label="खोज्नुहोस्"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
            <Link className="login-button" href="/login"><FontAwesomeIcon icon={faUser} /> लगइन</Link>
          </div>
        </div>
        <nav className={open ? "nav open" : "nav"}><div className="container nav-inner">{nav.map(([label, href], index) => <Link className={index === 0 ? "active" : ""} href={href} key={href}>{label}</Link>)}</div></nav>
      </header>
    </>
  );
}
