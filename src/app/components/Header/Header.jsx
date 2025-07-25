"use client";
import { twMerge } from "tailwind-merge";
import Logo from "./Logo";
import Link from "next/link";
import {
  DribbbleIcon,
  GithubIcon,
  LinkedinIcon,
  XIcon,
  SunIcon,
  MoonIcon,
} from "../Icons";
import siteMetadata from "@/src/utils/siteMetaData";
import useThemeSwitch from "../Hooks/useThemeSwitch";
import { useState } from "react";
import { useEffect, useRef } from "react";

const logoClassName =
  "inline-block h-6 w-6 mr-4 hover:scale-125 transition-all ease duration-200";
const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };

  const navRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setClick(false);
      }
    };

    if (click) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [click]);

  return (
    <header className="w-full p-4  px-5 sm:px-10 flex items-center justify-between">
      <Logo />

      {/*      {click && <MobileMenu toggle={toggle} />} */}
      <button
        className="inline-block sm:hidden z-50"
        ref={buttonRef}
        onClick={toggle}
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark 
              dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark 
              dark:bg-light rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark 
              dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      {/* {click && <MobileMenu navbar } */}

      <nav
        ref={navRef}
        className=" flex-col w-max py-3 px-6 sm:px-8 border border-solid 
        border-dark dark:border-light rounded-2xl font-medium capitalize items-center flex sm:hidden
        fixed top-5 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-0 z-50
        transition-all ease duration-300
        "
        style={{
          top: click ? "1rem" : "-10rem",
        }}
      >
        <Link href="/" className="mb-2">
          Home
        </Link>
        <Link href="/about" className="mb-2">
          About
        </Link>
        <Link href="/contact" className="mb-2">
          Contact
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={twMerge(
            "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>

      <nav
        className={twMerge(
          " w-max py-3 px-8 border border-solid  border-dark ",
          "rounded-full font-medium capitalize items-center hidden sm:flex",
          "fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50",
          " transition-all ease duration-300"
        )}
      >
        <Link
          href="/"
          className="mx-2 hover:scale-105 transition-all ease duration-300"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="mx-2 hover:scale-105 transition-all ease duration-300"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="mx-2 hover:scale-105 transition-all ease duration-300"
        >
          Contact
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={twMerge(
            "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>
      <div className="hidden sm:flex items-center">
        <a
          href={siteMetadata.linkedin}
          className={logoClassName}
          aria-label="Reach out to me via LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon />
        </a>
        <a
          href={siteMetadata.twitter}
          className={twMerge(logoClassName, "dark:fill-white")}
          aria-label="Reach out to me via X"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon />
        </a>

        <a
          href={siteMetadata.dribbble}
          className={logoClassName}
          aria-label="Reach out to me via Dribbble"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DribbbleIcon />
        </a>
        <a
          href={siteMetadata.github}
          className={twMerge(logoClassName, "dark:fill-white")}
          aria-label="Reach out to me via GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
