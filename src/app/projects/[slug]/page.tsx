import { DATA } from "@/data/resume";
import ProjectView from "./components/project-view";

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const selectedProject = DATA.featuredProjects.find(
    (proj) => proj.slug === params.slug
  );

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        Project not found
      </div>
    );
  }

  return <ProjectView project={selectedProject} />;
};

export default ProjectPage;
