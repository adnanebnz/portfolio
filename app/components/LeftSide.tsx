import { TbBrandGithub } from "react-icons/tb";
import {
  SlSocialLinkedin,
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialBehance,
} from "react-icons/sl";
const LeftSide = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end gap-4 text-textLight">
      <div className="flex flex-col gap-4">
        <a href="https://github.com/adnanebnz" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textBlue cursor-pointer hover:translate-y-2 transition-all duration-300">
            <TbBrandGithub />
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/adnane-benzerdjeb/"
          target="_blank"
        >
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textBlue cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialLinkedin />
          </span>
        </a>
        <a href="https://www.behance.net/SKILLZDZN" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textBlue cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialBehance />
          </span>
        </a>
        <a href="https://www.facebook.com/ski.llz.908/" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textBlue cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialFacebook />
          </span>
        </a>
        <a href="https://www.instagram.com/adnane_benzerdjeb/" target="_blank">
          <span className="w-10 h-10 text-xl bg-hoverColor rounded-full inline-flex items-center justify-center hover:text-textBlue cursor-pointer hover:translate-y-2 transition-all duration-300">
            <SlSocialInstagram />
          </span>
        </a>
      </div>
      <div className="w-[2px] h-32 bg-textDark"></div>
    </div>
  );
};

export default LeftSide;
