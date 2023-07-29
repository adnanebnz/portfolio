"use client";
import Gdsc from "../works/Gdsc";
import SectionTitle from "./SectionTitle";
import { useState } from "react";

const Experience = () => {
  const [activeGdsc, setActiveGdsc] = useState(true);
  return (
    <section
      id="experiences"
      className="max-w-containerSmall mx-auto lgl:px-20 py-24 flex flex-col gap-8"
    >
      <SectionTitle title="Experience" titleNo="02" />
      <div className="w-full mt-10 flex flex-col md:flex-row gap-16">
        <ul className="md:w-32 flex flex-col">
          <li
            className={`border-l-2 ${
              activeGdsc
                ? "border-l-textBlue text-textBlue"
                : "border-l-textDark text-textDark"
            } bg-transparent hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300 px-8 font-medium`}
          >
            Google Developers
          </li>
        </ul>
        {activeGdsc && <Gdsc />}
      </div>
    </section>
  );
};

export default Experience;
