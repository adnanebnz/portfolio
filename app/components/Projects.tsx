import AlgeriaEatsWeb from "@/app/assets/AlgeriaEats.png";
import AlgeriaEatsMobile from "@/app/assets/AlgeriaEatsMobile.png";
import dzhikers from "@/app/assets/DZHIKERS.jpg";
import Image from "next/image";
import { TbBrandGithub } from "react-icons/tb";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <section
      id="projects"
      className="max-w-containerSmall mx-auto lgl:px-10 py-24 flex flex-col gap-8"
    >
      <SectionTitle title="Built Projects" titleNo="03" />
      <div className="w-full flex flex-col items-center justify-center md:gap-28 gap-14 md:mt-10">
        {/* Project One */}
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
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
                  className="w-full h-full object-contain rounded-sm"
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
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://github.com/adnanebnz/algeria-eats"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={AlgeriaEatsWeb}
                  alt="project"
                  className="w-full h-full object-contain rounded-sm"
                />
              </div>
            </a>
            <div className="w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between items-end text-right z-10">
              <div>
                <p className="font-titleFont text-textBlue text-sm tracking-wide">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">Algeria Eats</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                Algeria Eats is an online platform facilitating the ordering of
                sweet and savory food. Artisans showcase their creations, and
                dedicated delivery personnel ensure timely deliveries. The
                website seamlessly connects customers with a diverse culinary
                experience.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>TailwindCSS</li>
                <li>AlpineJS</li>
                <li>Laravel</li>
                <li>Livewire</li>
                <li>MySQL</li>
                <li>Flutter</li>
                <li>GetX</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://github.com/adnanebnz/algeria-eats"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Projects Grid */}
      {/* <div className="grid grid-cols-3 gap-4 mt-14">
        <ProjectCard
          image={AlgeriaEatsMobile}
          description="Algeria Eats Mobile version is a Flutter app that allows users to order food from local artisans and have it delivered to their doorsteps. The app is built using the GetX state management library."
          link="#"
          projectName="Algeria Eats Mobile"
        />
        <ProjectCard
          image={AlgeriaEatsMobile}
          description="Algeria Eats Delivery is a Flutter app that allows delivery personnel to receive and deliver orders. The app is built using the GetX state management library."
          link="#"
          projectName="Algeria Eats Delivery"
        />
        <ProjectCard
          image={dzhikers}
          description="DZHIKERS Mobile version is a React Native app that allows users to view and book hikes and buy products."
          link="#"
          projectName="DZHIKERS Mobile"
        />
      </div> */}
    </section>
  );
};

export default Projects;
