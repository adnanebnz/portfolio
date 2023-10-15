"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const ref = React.useRef<string | any>("");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elm = document.getElementById(targetId);
    elm?.scrollIntoView({
      behavior: "smooth",
    });
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  };
  const handleClick = () => {};
  return (
    <div className="px-4 w-full shadow-navbarShadow h-20 lg:h-[12vh] fixed top-0 z-50 bg-bodyColor">
      <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div>
          <img src="skillz-white-hq.png" className="md:w-[190px] w-[150px]" />
        </div>
        <div className="hidden mdl:inline-flex items-center gap-7">
          <ul className="flex flex-row gap-7 items-center text-[14px]">
            <Link
              href="#home"
              className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300 nav-link"
              onClick={handleScroll}
            >
              <li>Home</li>
            </Link>
            <Link
              href="#about"
              className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300 nav-link"
              onClick={handleScroll}
            >
              <li>
                <span className="text-textBlue">01. </span>
                About
              </li>
            </Link>
            <Link
              href="#experiences"
              className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300 nav-link"
              onClick={handleScroll}
            >
              <li>
                <span className="text-textBlue">02. </span>
                Experiences
              </li>
            </Link>
            <Link
              href="#projects"
              className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300 nav-link"
              onClick={handleScroll}
            >
              <li>
                <span className="text-textBlue">03. </span>
                Projects
              </li>
            </Link>

            <Link
              href="#contact"
              className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300 nav-link"
              onClick={handleScroll}
            >
              <li>
                <span className="text-textBlue">04.</span>
                Contact
              </li>
            </Link>
          </ul>
          <a
            href={
              "https://drive.google.com/file/d/1KRtm4D77kURRaWtnpTYpvg3HzdwbTx7R/view?usp=sharing"
            }
            target="_blank"
          >
            <button className="px-4 py-2 rounded-md text-textBlue text-[14px] border border-textBlue hover:bg-hoverColor duration-300">
              Resume
            </button>
          </a>
        </div>
        {/* mobile nav */}
        <div
          className="w-6 h-5 flex flex-col justify-between items-center mdl:hidden text-4xl text-textBlue cursor-pointer overflow-hidden group"
          onClick={() => {
            setIsMobileNavOpen((state) => !state);
          }}
        >
          <span className="w-full h-[2px] bg-textBlue inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
          <span
            className="w-full h-[2px] bg-textBlue inline-flex transform 
          translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"
          ></span>
          <span className="w-full h-[2px] bg-textBlue inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
        </div>
        {isMobileNavOpen && (
          <div
            ref={(node) => (ref.current = node)}
            onClick={handleClick}
            className="absolute mdl:hidden top-0 right-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-end"
          >
            <div className="w-[80%] h-full overflow-y-scroll scrollbarhide bg-[#112240] flex flex-col items-center px-4 py-10 relative">
              <MdOutlineClose
                onClick={() => {
                  setIsMobileNavOpen(false);
                }}
                className="text-3xl text-textBlue cursor-pointer hover:text-red-500 absolute top-4 right-4"
              />
              <div>
                <ul className="flex flex-col text-base gap-7">
                  <li>
                    <Link
                      onClick={() => {
                        setIsMobileNavOpen(false);
                      }}
                      href={"#about"}
                      className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300"
                    >
                      <span className="text-textBlue">01.</span>About
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setIsMobileNavOpen(false);
                      }}
                      href={"#experiences"}
                      className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300"
                    >
                      <span className="text-textBlue">02.</span>Experience
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setIsMobileNavOpen(false);
                      }}
                      href={"#projects"}
                      className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300"
                    >
                      <span className="text-textBlue">03.</span>Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"#contact"}
                      onClick={() => {
                        setIsMobileNavOpen(false);
                      }}
                      className="flex items-center gap-1 font-medium text-textDark hover:text-textBlue cursor-pointer duration-300"
                    >
                      <span className="text-textBlue">04.</span>Contact
                    </Link>
                  </li>
                </ul>
                <a
                  href="https://drive.google.com/file/d/1KRtm4D77kURRaWtnpTYpvg3HzdwbTx7R/view?usp=sharing"
                  target="_blank"
                >
                  <button className="px-5 py-3 rounded-md text-textBlue text-[17px] border border-textBlue hover:bg-hoverColor duration-300 mt-10">
                    Resume
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
