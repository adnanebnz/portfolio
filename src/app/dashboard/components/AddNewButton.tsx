"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { addNewProject } from "../logic/logic";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const AddNewProjectButton = () => {
  const initialState = {
    errors: [],
  };
  const [state, formAction] = useFormState(addNewProject, initialState);
  const [links, setLinks] = useState([{ type: "", href: "" }]);

  const handleAddLink = () => {
    setLinks([...links, { type: "", href: "" }]);
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  useEffect(() => {
    state?.errors.forEach((error) => {
      toast.error(error.message);
    });
  }, [state?.errors]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="projectName" className="text-right">
              Project Name
            </Label>
            <Input
              id="projectName"
              name="name"
              placeholder="Enter project name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter project description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="slug" className="text-right">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              placeholder="Enter project slug"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tools" className="text-right">
              Tools
            </Label>
            <Input
              id="tools"
              name="tools"
              placeholder="Enter tools used"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dates" className="text-right">
              Dates
            </Label>
            <Input
              id="dates"
              name="dates"
              placeholder="Enter project dates"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="images" className="text-right">
              Images
            </Label>
            <Input
              id="images"
              name="images"
              type="file"
              multiple
              className="col-span-3"
            />
          </div>
          <div className="col-span-3">
            {links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  name={`links[${index}].type`}
                  placeholder="Link type"
                  value={link.type}
                  onChange={(e) =>
                    handleLinkChange(index, "type", e.target.value)
                  }
                />
                <Input
                  name={`links[${index}].href`}
                  placeholder="Link href"
                  value={link.href}
                  onChange={(e) =>
                    handleLinkChange(index, "href", e.target.value)
                  }
                />
              </div>
            ))}
            <Button onClick={handleAddLink}>Add Link</Button>
          </div>
          {state?.errors.map((error) => (
            <div key={error.message} className="text-sm text-red-500">
              {error.message}
            </div>
          ))}
          <DialogFooter>
            <Button type="submit" formAction={formAction}>
              Add Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProjectButton;
