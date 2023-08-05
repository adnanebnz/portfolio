"use client";
import { motion } from "framer-motion";
import { TiArrowForward } from "react-icons/ti";
const Gdsc = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.1,
      }}
      className="w-full"
    >
      <h3 className="flex gap-2 font-medium text-xl font-titleFont">
        Core Team Member & Organizer{" "}
        <span className="text-textBlue tracking-wide">@GoogleDevelopers</span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Oct. 2022 - Present
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Specializing in Web developement (React, NodeJS, ExpressJS, MongoDB)
        </li>

        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Organizing events.
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Participating in online/offline events and workshops.
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Sharing knowledge and helping students to learn new technologies.
        </li>
      </ul>
    </motion.div>
  );
};

export default Gdsc;
