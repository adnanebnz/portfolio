import Image from "next/image";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Envelope, Twitter, Linkedin, Github } from "./icons/";
import { Behance } from "./icons/behance";

const Sidebar = ({ data }) => {
  const { name, role, education, contactLinks } = data;

  return (
    <div className="bg-black flex flex-col  content-between w-full h-auto sm:h-screen sm:justify-around sm:w-1/3 sm:fixed">
      <div className="text-white flex flex-col p-10 items-center">
        <Image
          priority
          height={200}
          width={200}
          className="rounded-full mb-6"
          src="/images/itachi.jfif"
          alt="skillz"
          aria-label="itachi.jfif"
        />
        <h1 className="mb-2">{name}</h1>
        <h2 className="mb-2">{role}</h2>
        <div className="mb-8 flex items-center gap-1">
          <CiLocationOn size={26} />
          <h3>Algeria, Tlemcen</h3>
        </div>
        <p className="mb-2">{education[0]}</p>
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
