"use client";

import { Button } from "@/components/ui/button";
import { deleteProject } from "../logic/logic";
import { projectType } from "@/utils/types";

const DeleteProjectButton = ({ project }: { project: projectType }) => {
  return (
    <Button onClick={async () => await deleteProject(project.slug as string)}>
      Delete
    </Button>
  );
};

export default DeleteProjectButton;
