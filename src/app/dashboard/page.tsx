import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  getUserCount,
  isUserAdmin,
  getCommentsCount,
  getPostsCount,
  getProjectsCount,
  getReviewsCount,
} from "./logic/logic";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const userCount = await getUserCount();
  const postsCount = await getPostsCount();
  const projectsCount = await getProjectsCount();
  const commentsCount = await getCommentsCount();
  const reviewsCount = await getReviewsCount();

  if (!(await isUserAdmin())) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen w-full  rounded-md shadow-sm z-50">
      <aside className=" border-r w-14 sm:w-60 flex flex-col items-center sm:items-start py-6 px-2 sm:px-4 gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 sm:justify-start"
          prefetch={false}
        >
          <Package2Icon className="w-6 h-6" />
          <span className="text-lg font-semibold sm:block hidden">
            Acme Inc
          </span>
        </Link>
        <nav className="flex flex-col items-center sm:items-start w-full gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition"
            prefetch={false}
          >
            <UsersIcon className="w-5 h-5" />
            <span className="text-sm font-medium sm:block hidden">Users</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition"
            prefetch={false}
          >
            <FileTextIcon className="w-5 h-5" />
            <span className="text-sm font-medium sm:block hidden">Posts</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition"
            prefetch={false}
          >
            <MessageCircleIcon className="w-5 h-5" />
            <span className="text-sm font-medium sm:block hidden">
              Comments
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition"
            prefetch={false}
          >
            <BriefcaseIcon className="w-5 h-5" />
            <span className="text-sm font-medium sm:block hidden">
              Projects
            </span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 w-full py-2 px-3 rounded-md hover:bg-muted transition"
            prefetch={false}
          >
            <StarIcon className="w-5 h-5" />
            <span className="text-sm font-medium sm:block hidden">Reviews</span>
          </Link>
        </nav>
      </aside>
      <div className="flex-1 bg-muted/40 p-6 sm:p-10">
        <header className="mb-14">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between gap-2.5 p-3">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-6 h-6" />
                <CardTitle>Users</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-3xl font-bold">{userCount as number}</div>
              <p className="text-muted-foreground text-sm">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between gap-2.5 p-3">
              <div className="flex items-center gap-2">
                <FileTextIcon className="w-6 h-6" />
                <CardTitle>Posts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-3xl font-bold">{postsCount as number}</div>
              <p className="text-muted-foreground text-sm">New Posts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between gap-2.5 p-3">
              <div className="flex items-center gap-2">
                <MessageCircleIcon className="w-6 h-6" />
                <CardTitle>Comments</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-3xl font-bold">
                {commentsCount as number}
              </div>
              <p className="text-muted-foreground text-sm">Open Comments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between gap-2.5 p-3">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6" />
                <CardTitle>Projects</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-3xl font-bold">
                {projectsCount as number}
              </div>
              <p className="text-muted-foreground text-sm">Active Projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between gap-2.5 p-3">
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6" />
                <CardTitle>Reviews</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="text-3xl font-bold">{reviewsCount as number}</div>
              <p className="text-muted-foreground text-sm">Recent Reviews</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Tabs defaultValue="users">
            <TabsList className="border-b flex items-center justify-center h-fit w-fit mx-auto my-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="pb-4">All Users</CardTitle>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FilterIcon className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Active
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Inactive
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Banned
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="w-4 h-4" />
                      <span>Export</span>
                    </Button>
                    <Button size="sm">
                      <PlusIcon className="w-4 h-4" />
                      <span>Add User</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoveHorizontalIcon className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Deactivate</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="posts">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="pb-4">All Posts</CardTitle>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FilterIcon className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Published
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Draft
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Archived
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="w-4 h-4" />
                      <span>Export</span>
                    </Button>
                    <Button size="sm">
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Post</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Link
                            href="#"
                            className="font-medium"
                            prefetch={false}
                          >
                            Introduction to React
                          </Link>
                        </TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Published</Badge>
                        </TableCell>
                        <TableCell>2023-04-15</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoveHorizontalIcon className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="pb-4">All Comments</CardTitle>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FilterIcon className="w-4 h-4" />
                          <span>Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Approved
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Pending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Rejected
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="w-4 h-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Post</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>
                          This is a great article, thanks for sharing!
                        </TableCell>
                        <TableCell>
                          <Link href="#" prefetch={false}>
                            Introduction to React
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Approved</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoveHorizontalIcon className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Approve</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function DownloadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileTextIcon(props: any) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function FilterIcon(props: any) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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

function Package2Icon(props: any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
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

function StarIcon(props: any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
