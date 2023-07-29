import SectionTitle from "./SectionTitle";
import Image from "next/image";
import dzhikers from "./../assets/DZHIKERS.jpg";
import mypatient from "./../assets/MyPatient.jpg";
import { TbBrandGithub } from "react-icons/tb";

const Projects = () => {
  return (
    // TODO ADD PROJECTS
    <section
      id="projects"
      className="max-w-containerSmall mx-auto lgl:px-10 py-24 flex flex-col gap-8"
    >
      <SectionTitle title="Built Projects" titleNo="03" />
      <div className="w-full flex flex-col items-center justify-center gap-28 mt-10">
        {/* Project One */}
        <div className="w-full flex flex-col items-center justif-center gap-28 mt-10">
          <div className="flex flex-col xl:flex-row gap-6">
            <a
              href="https://github.com/adnanebnz/dzhikers-web"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={dzhikers}
                  alt="project"
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between items-end text-right xl:-ml-16 z-10">
              <div>
                <p className="font-titleFont text-textBlue text-sm tracking-wide">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">DZHIKERS</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                Dynamic platform made using MERN STACK and React Native for
                hikers in Algeria, offering captivating hikes and a shop selling
                specialty products.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>React</li>
                <li>NodeJS</li>
                <li>ExpressJS</li>
                <li>MongoDB</li>
                <li>React Native</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://github.com/adnanebnz/dzikers-web"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Two */}
        <div className="w-full flex flex-col items-center justif-center gap-28 mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://github.com/adnanebnz/dzhikers-web"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={mypatient}
                  alt="project"
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between items-end text-right z-10">
              <div>
                <p className="font-titleFont text-textBlue text-sm tracking-wide">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">MyPatient</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base xl:-mr-16  p-2 md:p-6 roundeed-md">
                A mobile application developed with Flutter and SQLite,
                dedicated to the management of patients in rehabilitation. It
                offers acomprehensive rehabilitation exercise tracking system
                for each patient.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>Flutter</li>
                <li>SQLite</li>
                <li>GetX</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://github.com/adnanebnz/my_pattient"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Three */}
        {/* Project Four */}
        {/* Project Five */}
        {/* Project Six */}
      </div>
    </section>
  );
};

export default Projects;
