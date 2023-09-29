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
      <div className="flex flex-col gap-1">
        <p className="font-medium text-xl font-titleFont">
          Core Team Member & Design department manager
        </p>
        <p className="text-textBlue tracking-wide text-md">@GoogleDevelopers</p>
      </div>
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
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Creating Design for events and social media.
        </li>
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textBlue mt-1">
            <TiArrowForward />
          </span>
          Leading the Design department.
        </li>
      </ul>
    </motion.div>
  );
};

export default Gdsc;
