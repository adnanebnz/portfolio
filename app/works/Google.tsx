"use client";
import { motion } from "framer-motion";
import { TiArrowForward } from "react-icons/ti";
const Google = () => {
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
        <span className="text-textGreen tracking-wide">@GoogleDevelopers</span>
      </h3>
      <p className="text-sm mt-1 font-medium text-textDark">
        Jan. 2023 - Present
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        <li className="text-base flex gap-2 text-textDark">
          <span className="text-textGreen mt-1">
            <TiArrowForward />
          </span>
          Hackathons and all
        </li>
      </ul>
    </motion.div>
  );
};

export default Google;
