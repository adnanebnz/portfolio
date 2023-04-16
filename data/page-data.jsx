import { GrAssistListening } from "react-icons/gr";
import { GiIdea, GiTalk } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { GrUserWorker } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import {
  SiExpress,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiStrapi,
  SiTailwindcss,
  SiThealgorithms,
  SiTypescript,
} from "react-icons/si";
import { TbBrandReactNative as TbR } from "react-icons/tb";
import { FaFigma, FaJava, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import { DiIllustrator as DiAdobeillustrator } from "react-icons/di";
import { DiPhotoshop as DiAdobePhotoshop } from "react-icons/di";
export const personalData = {
  name: "Benzerdjeb MOHAMED Adnane",
  role: "Software Engineer",
  education: [
    "Bachelor of Science in Computer Science, University of Tlemcen (2020-2023)",
  ],
  contactLinks: [
    "mailto:emailto:benzerdjebadnane13@gmail.com",
    "https://twitter.com/adnane1337",
    "https://www.linkedin.com/in/adnane-benzerdjeb-642096243/",
    "https://github.com/adnanebnz",
    "https://behance.net/SKILLZDZN",
  ],
};

export const aboutMe = {
  title: "About Me",
  body: [
    "I am a highly motivated and skilled software engineer with a passion for software development. With a strong addiction to technology, I had developed a keen interest in staying up-to-date with the latest advancements in the field. I am a lifelong learner who is always eager to share my knowledge with others, making me a valuable addition to any team.  where I can utilize my expertise and contribute to the development of cutting-edge technologies.",
  ],
};

export const skills = {
  soft: [
    { icon: <GrAssistListening size={18} />, text: "Active Listening" },
    { icon: <GiTalk />, text: "Effective Communication" },
    { icon: <GrGroup />, text: "Collaboration" },
    { icon: <GrUserWorker />, text: "Teamwork" },
    { icon: <GiIdea />, text: "Creative Problem Solving" },
    { icon: <BiTimeFive />, text: "Time management" },
  ],
  hard: [
    { icon: <SiTypescript />, text: "TypeScript" },
    { icon: <SiNextdotjs />, text: "NextJS" },
    { icon: <FaReact />, text: "React" },
    { icon: <TbR />, text: "React Native" },
    { icon: <SiTailwindcss />, text: "Tailwindcss" },
    { icon: <FaNodeJs />, text: "NodeJS" },
    { icon: <SiExpress />, text: "Express" },
    { icon: <SiStrapi />, text: "Strapi" },
    { icon: <FaPhp />, text: "PHP" },
    { icon: <SiLaravel />, text: "Laravel" },
    { icon: <SiPostgresql />, text: "SQL" },
    { icon: <SiMongodb />, text: "noSQL" },
    { icon: <FaJava />, text: "Java" },
    { icon: <SiThealgorithms />, text: "Data Structures and Algorithms" },
    { icon: <FaFigma />, text: "Figma" },
    { icon: <DiAdobeillustrator />, text: "Adobe Illustrator" },
    { icon: <DiAdobePhotoshop />, text: "Adobe Photoshop" },
  ],
};

export const professionalData = {
  title: "PROJECTS",
  experiences: [
    {
      role: "DZHIKERS PROJECT",
      description:
        "A project that helps you to find hikes and product related to this kind of activities, A user interactive website with a map that shows the location of the hikes and a list of hikes with their details. The website is built with  React, Tailwindcss, Mapbox, and NodeJS and EXPRESS, The website is not deployed yet. The project is open source and you can find it on Github.",
      link: "https://www.dzhikers.live",
      current: true,
    },

    {
      role: "E-COMMERCE WEBSITE",
      description:
        "A project that manages the products and the orders of a shop. It's built with  React Material UI and Strapi for the backend, The website is not deployed yet. The project is open source and you can find it on Github.",
      link: "https://github.com/adnanebnz/Fullstack-Ecommerce-website",
      current: false,
    },
  ],
};
