import AlgeriaEatsWeb from "@/app/assets/AlgeriaEats.png";
import AlgeriaEatsMobile from "@/app/assets/AlgeriaEatsMobile.png";
import dzhikers from "@/app/assets/DZHIKERS.jpg";
import mypatient from "@/app/assets/MyPatient.jpg";
import TrendyStore from "@/app/assets/TrendyStore.png";
import filamentApp from "@/app/assets/filamentApp2.png";
import Image from "next/image";
import { BsGlobe } from "react-icons/bs";
import { TbBrandGithub } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

const Projects = () => {
  return (
    // TODO ADD PROJECTS
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
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://github.com/adnanebnz/my_pattient"
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
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row gap-6">
            <a
              href="https://trendy-store.fly.dev/"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={TrendyStore}
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
                <h3 className="text-2xl font-bold">TrendyStore</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base p-2 md:p-6 roundeed-md">
                An E-Commerce Website made for a client using the TALL STACK
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>TailwindCSS</li>
                <li>AlpineJS</li>
                <li>Laravel</li>
                <li>Livewire</li>
                <li>MySQL</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://trendy-store.fly.dev/"
                  target="_blank"
                  className="flex items-center gap-1 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300"
                >
                  <p className="font-medium text-[16px] font-titleFont">
                    Live demo
                  </p>
                  <BsGlobe className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Four */}
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://github.com/adnanebnz/filament-app"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={filamentApp}
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
                <h3 className="text-2xl font-bold">CMS Dashboard</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base xl:-mr-16  p-2 md:p-6 roundeed-md">
                A dashboard that manages Content on a blog website it creates
                Posts,Categories and Users and manages them.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>Laravel</li>
                <li>Filament</li>
                <li>MySQL</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://github.com/adnanebnz/filament-app"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Five */}
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row gap-6">
            <a
              href="https://github.com/adnanebnz/algeria-eats"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={AlgeriaEatsWeb}
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
        {/* Project Six */}
        <div className="w-full flex flex-col items-center justif-center gap-28 md:mt-10">
          <div className="flex flex-col xl:flex-row-reverse gap-6">
            <a
              href="https://github.com/adnanebnz/algeria-eats-mobile"
              target="_blank"
              className="w-full xl:w-1/2 h-auto relative group"
            >
              <div>
                <Image
                  src={AlgeriaEatsMobile}
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
                <h3 className="text-2xl font-bold">Algeria Eats Mobile</h3>
              </div>
              <p className="bg-[#112240] text-sm md:text-base xl:-mr-16  p-2 md:p-6 roundeed-md">
                Algeria Eats, built on Flutter, offers a mobile-friendly
                platform for ordering sweet and savory delights. With artisan
                profiles and efficient delivery services, the app enhances the
                user experience, providing a seamless connection to a diverse
                culinary world.
              </p>
              <ul className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2 md:gap-3 justify-between text-textDark">
                <li>Flutter</li>
                <li>GetX</li>
              </ul>
              <div className="flex gap-3 items-center text-3xl">
                <a
                  href="https://github.com/adnanebnz/algeria-eats-mobile"
                  target="_blank"
                >
                  <TbBrandGithub className="w-8 h-8 text-textDark hover:text-textBlue cursor-pointer transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
