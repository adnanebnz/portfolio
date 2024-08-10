import { getProjectBySlug } from "../logic/logic";

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = await getProjectBySlug(params.slug);
  if (project.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Project not found
      </div>
      // TODO ERROR 404 PAGE and do it in the action
    );
  }
};

export default ProjectPage;
