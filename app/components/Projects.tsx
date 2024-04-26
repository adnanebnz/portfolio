import MultiVendor from "@/app/assets/multi-vendor.png";
import AlgeriaEatsMobile from "@/app/assets/AlgeriaEatsMobile.png";
import MoviesApp from "@/app/assets/MoviesApp.png";
import dzhikers from "@/app/assets/DZHIKERS.jpg";
import Image from "next/image";
import { TbBrandGithub } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col gap-8 py-24 mx-auto max-w-containerSmall lgl:px-10"
    >
      <SectionTitle title="Built Projects" titleNo="03" />
      <div className="flex flex-col items-center justify-center w-full md:gap-28 gap-14 md:mt-10">
        {/* Project One */}
        <div className="flex flex-col items-center w-full gap-4 justif-center md:mt-10">
          <div className="flex flex-col gap-6 xl:flex-row">
            <a
              href="https://github.com/adnanebnz/dzhikers-web"
              target="_blank"
              className="relative w-full h-auto xl:w-1/2 group"
            >
              <div>
                <Image
                  src={dzhikers}
                  alt="project"
                  className="object-contain w-full h-full rounded-sm"
                />
              </div>
            </a>
            <div className="z-10 flex flex-col items-end w-full gap-6 text-right xl:w-1/2 lgl:justify-between xl:-ml-16">
              <div>
                <p className="text-sm tracking-wide font-titleFont text-textBlue">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">DZHIKERS</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                Dynamic platform made using MERN STACK and React Native for
                hikers in Algeria, offering captivating hikes and a shop selling
                specialty products.
              </p>
              <ul className="flex justify-between gap-2 text-xs tracking-wide md:text-sm font-titleFont md:gap-3 text-textDark">
                <li>React</li>
                <li>NodeJS</li>
                <li>ExpressJS</li>
                <li>MongoDB</li>
                <li>React Native</li>
              </ul>
              <div className="flex items-center gap-3 text-3xl">
                <a
                  href="https://github.com/adnanebnz/dzikers-web"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 transition-all duration-300 cursor-pointer text-textDark hover:text-textBlue" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Two */}
        <div className="flex flex-col items-center w-full gap-4 justif-center md:mt-10">
          <div className="flex flex-col gap-6 xl:flex-row-reverse">
            <a
              href="https://github.com/adnanebnz/algeria-eats"
              target="_blank"
              className="relative w-full h-auto xl:w-1/2 group"
            >
              <div>
                <Image
                  src={AlgeriaEatsMobile}
                  alt="project"
                  className="object-contain w-full h-full rounded-sm"
                />
              </div>
            </a>
            <div className="z-10 flex flex-col items-end w-full gap-6 text-right xl:w-1/2 lgl:justify-between">
              <div>
                <p className="text-sm tracking-wide font-titleFont text-textBlue">
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
              <ul className="flex justify-between gap-2 text-xs tracking-wide md:text-sm font-titleFont md:gap-3 text-textDark">
                <li>TailwindCSS</li>
                <li>AlpineJS</li>
                <li>Laravel</li>
                <li>Livewire</li>
                <li>MySQL</li>
                <li>Flutter</li>
                <li>GetX</li>
              </ul>
              <div className="flex items-center gap-3 text-3xl">
                <a
                  href="https://github.com/adnanebnz/algeria-eats"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 transition-all duration-300 cursor-pointer text-textDark hover:text-textBlue" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Three */}
        <div className="flex flex-col items-center w-full gap-4 justif-center md:mt-10">
          <div className="flex flex-col gap-6 xl:flex-row">
            <a
              href="https://github.com/adnanebnz/dzhikers-web"
              target="_blank"
              className="relative w-full h-auto xl:w-1/2 group"
            >
              <div>
                <Image
                  src={MoviesApp}
                  alt="project"
                  className="object-contain w-full h-full rounded-sm"
                />
              </div>
            </a>
            <div className="z-10 flex flex-col items-end w-full gap-6 text-right xl:w-1/2 lgl:justify-between xl:-ml-16">
              <div>
                <p className="text-sm tracking-wide font-titleFont text-textBlue">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">Movies App</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                I developed a movies app using Flutter and BLoC architecture,
                integrating with The Movie Database (TMDB) API. The app
                streamlines the movie search process, providing users with a
                seamless and intuitive interface to discover and explore a wide
                range of movies.
              </p>
              <ul className="flex justify-between gap-2 text-xs tracking-wide md:text-sm font-titleFont md:gap-3 text-textDark">
                <li>Flutter</li>
                <li>BLoC</li>
                <li>Hive</li>
              </ul>
              <div className="flex items-center gap-3 text-3xl">
                <a
                  href="https://github.com/adnanebnz/clean_architecture_movies_app"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 transition-all duration-300 cursor-pointer text-textDark hover:text-textBlue" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Four */}
        <div className="flex flex-col items-center w-full gap-4 justif-center md:mt-10">
          <div className="flex flex-col gap-6 xl:flex-row-reverse">
            <a
              href="https://github.com/adnanebnz/multi-vendor-project"
              target="_blank"
              className="relative w-full h-auto xl:w-1/2 group"
            >
              <div>
                <Image
                  src={MultiVendor}
                  alt="project"
                  className="object-contain w-full h-full rounded-sm"
                />
              </div>
            </a>
            <div className="z-10 flex flex-col items-end w-full gap-6 text-right xl:w-1/2 lgl:justify-between">
              <div>
                <p className="text-sm tracking-wide font-titleFont text-textBlue">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold">Multi Vendor Web App</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                This is a multi-vendor web app that allows vendors to register
                and sell their products online with the possibility to chat with
                customers and receive payments online.
              </p>
              <ul className="flex justify-between gap-2 text-xs tracking-wide md:text-sm font-titleFont md:gap-3 text-textDark">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>SocketIO</li>
                <li>React</li>
              </ul>
              <div className="flex items-center gap-3 text-3xl">
                <a
                  href="https://github.com/adnanebnz/multi-vendor-project"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 transition-all duration-300 cursor-pointer text-textDark hover:text-textBlue" />
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
