import Image from "next/image";
import image from "../assets/image.jpg";
import SectionTitle from "./SectionTitle";
import {
  SiPython,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiDjango,
  SiLaravel,
  SiMongodb,
  SiPostgresql,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
} from "react-icons/si";
const About = () => {
  return (
    <section
      id="about"
      className="max-w-containerSmall mx-auto lgl:px-20 py-24 flex flex-col gap-8"
    >
      <SectionTitle title="About Me" titleNo="01" />
      <div className="flex flex-col lgl:flex-row gap-16">
        <div className="w-full lgl:w-2/3 text-base text-textDark font-medium flex flex-col gap-4">
          <p>
            My name is Benzerdjeb Adnane a software engineer based in
            Tlemcen,Algeria Studied Computer Science in university of Abou-Bekr
            Belkaid Tlemcen.
          </p>
          <p className="">
            Here are some tech stacks I Have been working with recently:
          </p>
          <div className="flex flex-col text-3xl gap-4 items-center justify-center">
            <div className="flex mdl:gap-7 gap-2 items-center">
              <SiHtml5 />
              <SiCss3 />
              <SiJavascript />
              <SiTypescript />
              <SiPython />
              <SiReact />
              <SiNextdotjs />
              <SiTailwindcss />
            </div>
            <div className="flex mdl:gap-7 gap-2 items-center">
              <SiDocker />
              <SiDjango />
              <SiLaravel />
              <SiMongodb />
              <SiPostgresql />
              <SiNodedotjs />
              <SiExpress />
              <SiFlutter />
            </div>
          </div>
        </div>
        <div className="w-full lgl:w-1/3 h-80 relative group">
          <div className="absolute w-full h-80 -left-6 -top-6 rounded-lg">
            <div className="w-full h-full relative z-20 flex pl-6 items-center justify-center lgl:pl-0">
              <Image
                src={image}
                alt="Adnane Benzerdjeb"
                layout="fill"
                className="rounded-lg"
              />
              <div className="hidden lgl:inline-block absolute w-full h-80 bg-textBlue/10 rounded-md top-0 left-0 group-hover:bg-transparent duration-300"></div>
            </div>
          </div>
          <div className="hidden lgl:inline-flex w-full h-80 border-2 border-textBlue rounded-md group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
