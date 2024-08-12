import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { getAllProjects } from "@/app/projects/logic/logic";
import AddNewProjectButton from "./AddNewButton";
import DeleteProjectButton from "./DeleteProjectButton";
import { StoreIcon } from "lucide-react";

export default async function ProjectsView() {
  const projects = await getAllProjects();

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <AddNewProjectButton />
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-2">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Manage your projects and view their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects?.data?.map((project, index) => (
                    <div
                      key={index}
                      className="rounded-lg border bg-background p-4"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-lg font-medium">
                          {project.name}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <DotsVerticalIcon className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>
                              <DeleteProjectButton project={project} />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mb-4">
                        <Textarea
                          placeholder="Project description"
                          className="h-24 resize-none"
                          value={project.description}
                        />
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 text-sm font-medium">Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {project.tools?.map((tool: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="mb-2 text-sm font-medium">Links</div>
                          <div className="space-y-2">
                            {project.ghlink && (
                              <Link
                                key={index}
                                href={project.ghlink}
                                className="flex items-center gap-2 text-sm"
                                prefetch={false}
                              >
                                <GithubIcon className="h-4 w-4" />
                                {project.ghlink}
                              </Link>
                            )}
                            {project.storelink && (
                              <Link
                                key={index}
                                href={project.storelink}
                                className="flex items-center gap-2 text-sm"
                                prefetch={false}
                              >
                                <StoreIcon className="h-4 w-4" />
                                {project.storelink}
                              </Link>
                            )}
                            {project.demolink && (
                              <Link
                                key={index}
                                href={project.demolink}
                                className="flex items-center gap-2 text-sm"
                                prefetch={false}
                              >
                                <GlobeIcon className="h-4 w-4" />
                                {project.demolink}
                              </Link>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 text-sm font-medium">Images</div>
                          <div className="grid grid-cols-2 gap-2">
                            {project.images?.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                width={80}
                                height={80}
                                alt={`Project Image ${index + 1}`}
                                className="rounded-md"
                                style={{
                                  aspectRatio: "80/80",
                                  objectFit: "cover",
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div>Created: {project.created_at}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function GitlabIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
