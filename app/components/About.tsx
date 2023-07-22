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
      className="max-w-containerSmall mx-auto py-10 lgl:py-32 flex flex-col gap-8"
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
          <div className="grid grid-cols-4 grid-rows-3 items-center place-content-center text-3xl gap-3">
            <SiHtml5 />
            <SiCss3 />
            <SiJavascript />
            <SiTypescript />
            <SiPython />
            <SiReact />
            <SiNextdotjs />
            <SiTailwindcss />
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
        <div></div>
      </div>
    </section>
  );
};

export default About;
