import React from "react";
import Image, { StaticImageData } from "next/image";

interface ProjectCardProps {
  projectName: string;
  description: string;
  image: StaticImageData;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  description,
  image,
}) => {
  return (
    <div className="relative group bg-black/20 p-6 rounded-md shadow-sm cursor-pointer transition-colors duration-300 w-[300px]">
      <div className="h-48 w-full">
        <Image
          src={image}
          alt={projectName}
          objectFit="cover"
          layout="fill"
          className="rounded-md"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h2 className="text-md font-semibold mb-4 text-white">{projectName}</h2>
        <p className="text-gray-200 mb-4 text-sm">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <span className="px-4 py-2 bg-white text-black rounded-md text-sm">
          Go to Project
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
