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
  SiNextdotjs,
  SiPrisma,
  SiTrpc,
  SiKotlin,
  SiDjango,
  SiAdonisjs,
  SiNestjs,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
const About = () => {
  return (
    <section
      id="about"
      className="max-w-contentContainer mx-auto lgl:px-20 py-24 flex flex-col gap-8"
    >
      <SectionTitle title="About Me" titleNo="01" />
      <div className="flex flex-col lgl:flex-row gap-16">
        <div className="w-full  text-base text-textDark font-medium flex flex-col gap-4">
          <div className="w-full lgl:w-11/12 text-base text-textDark font-medium flex flex-col gap-4">
            <p>
              My name is Benzerdjeb Adnane a software engineer based in
              Tlemcen,Algeria Studied Computer Science in university of
              Abou-Bekr Belkaid Tlemcen.
            </p>
            <p className="">
              Here are some tech stacks I Have been working with recently:
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-transpaernt border-[1px] rounded-lg p-3 shadow-md border-blue-500">
              <p className="font-semibold text-gray-300">T3 Stack</p>
              <p className="mt-2">
                Building Scalable web applications using NextJS, TailwindCSS,
                Prisma, Trpc.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiNextdotjs className="text-textBlue text-2xl" />
                <SiTailwindcss className="text-textBlue text-2xl" />
                <SiPrisma className="text-textBlue text-2xl" />
                <SiTrpc className="text-textBlue text-2xl" />
              </div>
            </div>

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

            <div className="bg-transpaernt border-[1px] border-blue-500 rounded-lg p-3 shadow-md">
              <p className="font-semibold text-gray-300">Backend Development</p>
              <p className="mt-2">
                Building Scalable APIs using different technologies like NodeJS,
                Python, PHP.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiAdonisjs className="text-textBlue text-2xl" />
                <SiNestjs className="text-textBlue text-2xl" />
                <SiDjango className="text-textBlue text-2xl" />
                <SiLaravel className="text-textBlue text-2xl" />
              </div>
            </div>

            <div className="bg-transpaernt border-[1px] rounded-lg p-3 shadow-md border-blue-500">
              <p className="font-semibold text-gray-300">
                Cross Platform Mobile Apps Developement
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
            <div className="bg-transpaernt border-[1px] rounded-lg p-3 shadow-md border-blue-500">
              <p className="font-semibold text-gray-300">
                Native Mobile Apps Developement
              </p>
              <p className="mt-2">
                Building mobile apps with Kotlin or Java for Android.
              </p>
              <div className="mt-2 flex flex-row gap-1 items-center justify-center">
                <SiKotlin className="text-textBlue text-2xl" />
                <FaJava className="text-textBlue text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
