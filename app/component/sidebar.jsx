import Image from "next/image";
import React from "react";

import { Envelope, Twitter, Linkedin, Github } from "./icons/";
import { Behance } from "./icons/behance";

const Sidebar = ({ data }) => {
  const { name, role, education, contactLinks } = data;

  return (
    <div className="bg-black flex flex-col  content-between w-full h-auto sm:h-screen sm:justify-around sm:w-1/3 sm:fixed">
      <div className="text-white flex flex-col p-10 items-center">
        <Image
          priority
          width={200}
          height={200}
          className="rounded-full h-full mb-6"
          src="/images/julian-wan-WNoLnJo7tS8-unsplash.jpg"
          alt="skillz"
          aria-label="skillz.jpg"
        />
        <h1 className="mb-2">{name}</h1>
        <h2 className="mb-8">{role}</h2>
        <p className="mb-2">{education[0]}</p>
        <p className="mb-2">{education[1]}</p>
        <div className="text-white text-center mb-4 mt-4 sm:mt-8">
          <h3 className="mb-2"> CONTACT ME</h3>
          <div className="flex flex-row justify-center gap-2">
            <a
              className="icons-contactme"
              href={contactLinks?.[0]}
              aria-label={"email link"}
            >
              <Envelope />
            </a>
            <a
              className="icons-contactme"
              href={contactLinks?.[1]}
              aria-label={"twitter link"}
            >
              <Twitter />
            </a>
            <a
              className="icons-contactme"
              href={contactLinks?.[2]}
              aria-label={"linkedin link"}
            >
              <Linkedin />
            </a>
            <a
              className="icons-contactme "
              href={contactLinks?.[3]}
              aria-label={"github link"}
            >
              <Github />
            </a>
            <a
              className="icons-contactme"
              href={contactLinks?.[4]}
              aria-label={"email link"}
            >
              <Behance />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
