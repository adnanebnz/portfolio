import Image from "next/image";
import image from "../assets/image.jpg";
import SectionTitle from "./SectionTitle";
import {
  SiTailwindcss,
  SiReact,
  SiLaravel,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiAlpinedotjs,
  SiLivewire,
  SiFirebase,
  SiSupabase,
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

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-transpaernt border-[1px] rounded-lg p-3 shadow-md border-blue-500">
              <p className="font-semibold text-gray-300">MERN Stack</p>
              <p className="mt-2">
                Building APIs using NodeJS and Express, and using ReactJS for
                the frontend.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiMongodb className="text-textBlue text-2xl" />
                <SiExpress className="text-textBlue text-2xl" />
                <SiReact className="text-textBlue text-2xl" />
                <SiNodedotjs className="text-textBlue text-2xl" />
              </div>
            </div>

            <div className="bg-transpaernt border-[1px] border-blue-500 rounded-lg p-3 shadow-md">
              <p className="font-semibold text-gray-300">TALL Stack</p>
              <p className="mt-2">
                Building web apps using TailwindCSS, AlpineJS, Laravel and
                Livewire.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiTailwindcss className="text-textBlue text-2xl" />
                <SiAlpinedotjs className="text-textBlue text-2xl" />
                <SiLaravel className="text-textBlue text-2xl" />
                <SiLivewire className="text-textBlue text-2xl" />
              </div>
            </div>

            <div className="bg-transpaernt border-[1px] rounded-lg p-3 shadow-md border-blue-500">
              <p className="font-semibold text-gray-300">
                Mobile Apps Developement
              </p>
              <p className="mt-2">
                Building mobile apps using Flutter, React Native and BaaS.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiReact className="text-textBlue text-2xl" />
                <SiFlutter className="text-textBlue text-2xl" />
                <SiFirebase className="text-textBlue text-2xl" />
                <SiSupabase className="text-textBlue text-2xl" />
              </div>
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
